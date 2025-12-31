from sqlalchemy import Column, Integer, String, LargeBinary, DateTime, JSON
from datetime import datetime
from database import Base

class FileRecord(Base):
    __tablename__ = "files"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    content_type = Column(String)
    data = Column(LargeBinary)  # BLOB storage
    settings = Column(JSON)      # Store print settings as JSON
    created_at = Column(DateTime, default=datetime.utcnow)

class Shop(Base):
    __tablename__ = "shops"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    address = Column(String)
    distance = Column(String)
    rating = Column(Integer)
    is_open = Column(String)
    is_high_traffic = Column(String)
    estimated_time = Column(String)
