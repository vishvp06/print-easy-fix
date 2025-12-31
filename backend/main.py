import os
import uuid
from typing import List
from fastapi import FastAPI, Depends, UploadFile, File, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import crud, models, schemas, database, payments, tasks
from database import engine, get_db
import json

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="PrintEasy API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    db = next(get_db())
    crud.seed_shops(db)
    tasks.start_cleanup_task()

@app.get("/shops", response_model=List[schemas.ShopResponse])
def read_shops(db: Session = Depends(get_db)):
    return crud.get_shops(db)

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    file_id = str(uuid.uuid4())
    file_content = await file.read()
    
    # Default settings
    default_settings = {
        "colorMode": None,
        "orientation": None,
        "pageRange": "all",
        "customPages": "",
        "paperSize": "a4",
        "pagesPerSheet": None,
        "duplexMode": None,
    }
    
    db_file = crud.create_file(
        db, 
        file_id=file_id, 
        name=file.filename, 
        content_type=file.content_type, 
        data=file_content,
        settings=default_settings
    )
    
    return {
        "id": db_file.id,
        "name": db_file.name,
        "url": f"/files/{db_file.id}/preview"
    }

@app.get("/files/{file_id}/preview")
def preview_file(file_id: str, db: Session = Depends(get_db)):
    db_file = crud.get_file(db, file_id)
    if not db_file:
        raise HTTPException(status_code=404, detail="File not found")
    
    return Response(content=db_file.data, media_type=db_file.content_type)

@app.patch("/files/{file_id}/settings")
def update_settings(file_id: str, settings: dict, db: Session = Depends(get_db)):
    db_file = crud.get_file(db, file_id)
    if not db_file:
        raise HTTPException(status_code=404, detail="File not found")
    
    db_file.settings = settings
    db.commit()
    return {"status": "success"}

@app.post("/payments/create-order")
def create_order(amount: int):
    try:
        order = payments.create_razorpay_order(amount)
        return order
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/payments/verify")
def verify_payment(params: dict):
    try:
        if payments.verify_payment_signature(params):
            return {"status": "payment verified"}
        else:
            raise HTTPException(status_code=400, detail="Signature verification failed")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
