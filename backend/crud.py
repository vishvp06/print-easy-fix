from sqlalchemy.orm import Session
import models, schemas
import uuid
from datetime import datetime, timedelta

def create_file(db: Session, file_id: str, name: str, content_type: str, data: bytes, settings: dict):
    db_file = models.FileRecord(
        id=file_id,
        name=name,
        content_type=content_type,
        data=data,
        settings=settings
    )
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file

def get_file(db: Session, file_id: str):
    return db.query(models.FileRecord).filter(models.FileRecord.id == file_id).first()

def get_shops(db: Session):
    return db.query(models.Shop).all()

def delete_old_files(db: Session):
    cutoff = datetime.utcnow() - timedelta(hours=16)
    db.query(models.FileRecord).filter(models.FileRecord.created_at < cutoff).delete()
    db.commit()

def seed_shops(db: Session):
    # Check if shops already exist
    if db.query(models.Shop).count() > 0:
        return
    
    mock_shops = [
        {
            "name": "Quick Print Hub",
            "address": "123 MG Road, Koramangala",
            "distance": "0.8 km",
            "rating": 4.8,
            "is_open": "True",
            "is_high_traffic": "False",
            "estimated_time": "5-10 min",
        },
        {
            "name": "Rapid Xerox Center",
            "address": "456 Brigade Road, Near Metro",
            "distance": "1.2 km",
            "rating": 4.5,
            "is_open": "True",
            "is_high_traffic": "True",
            "estimated_time": "15-20 min",
        }
    ]
    
    for shop_data in mock_shops:
        db_shop = models.Shop(**shop_data)
        db.add(db_shop)
    db.commit()
