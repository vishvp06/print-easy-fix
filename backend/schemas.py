from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Any

class FileBase(BaseModel):
    name: str
    content_type: str
    settings: Optional[dict] = None

class FileCreate(FileBase):
    id: str

class FileResponse(FileBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True

class ShopBase(BaseModel):
    name: str
    address: str
    distance: str
    rating: float
    is_open: bool
    is_high_traffic: bool
    estimated_time: str

class ShopResponse(ShopBase):
    id: int

    class Config:
        from_attributes = True
