import os
from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.database import connect_db, close_db, get_db
from app.bot_manager import bot_manager
from app.scanner import scan_and_clean_messages
import logging

logging.basicConfig(level=logging.INFO)

app = FastAPI(title="MTProto Anti-Ad Service")
scheduler = AsyncIOScheduler()

class RegisterRequest(BaseModel):
    bot_token: str
    chat_id: int
    message_id: int

@app.on_event("startup")
async def startup():
    # Ensure sessions directory exists
    if not os.path.exists("sessions"):
        os.makedirs("sessions")
        
    await connect_db()
    
    # Start APScheduler
    scheduler.add_job(scan_and_clean_messages, "interval", minutes=5)
    scheduler.start()

@app.on_event("shutdown")
async def shutdown():
    scheduler.shutdown()
    await bot_manager.stop_all()
    await close_db()

@app.post("/register")
async def register_message(req: RegisterRequest):
    db = get_db()
    # Insert message to be checked later
    await db.monitored_messages.insert_one({
        "bot_token": req.bot_token,
        "chat_id": req.chat_id,
        "message_id": req.message_id,
        "status": "pending"
    })
    return {"success": True, "message": "Message registered for MTProto scan."}
