import time
from threading import Thread
from database import SessionLocal
import crud

def cleanup_worker():
    while True:
        try:
            db = SessionLocal()
            crud.delete_old_files(db)
            db.close()
        except Exception as e:
            print(f"Error during cleanup: {e}")
        
        # Run every hour
        time.sleep(3600)

def start_cleanup_task():
    thread = Thread(target=cleanup_worker, daemon=True)
    thread.start()
