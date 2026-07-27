from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from app.database import connect_db, close_db, get_db
from app.models import RegisterRequest, CleanupRequest
from app.services import run_cleanup
from datetime import datetime

app = FastAPI(title="BB Anti-Ad API")

@app.on_event("startup")
async def startup():
    await connect_db()

@app.on_event("shutdown")
async def shutdown():
    await close_db()

@app.post("/register")
async def register_message(req: RegisterRequest):
    db = get_db()
    
    await db.chats.update_one(
        {"bot_token": req.bot_token, "chat_id": req.chat_id},
        {"$set": {
            "last_message_id": req.message_id,
            "updated_at": datetime.utcnow()
        }},
        upsert=True
    )
    return {"success": True, "message": "Message registered"}

@app.post("/cleanup")
async def start_cleanup(req: CleanupRequest):
    db = get_db()
    chat_doc = await db.chats.find_one({"bot_token": req.bot_token, "chat_id": req.chat_id})
    
    if not chat_doc or "last_message_id" not in chat_doc:
        raise HTTPException(status_code=404, detail="No registered messages for this chat")
    
    last_bot_message_id = chat_doc["last_message_id"]
    
    # Run the cleanup logic
    result = await run_cleanup(req.bot_token, req.chat_id, last_bot_message_id)
    return result

@app.get("/status")
async def status():
    return {"status": "running"}
