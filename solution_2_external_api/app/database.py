from motor.motor_asyncio import AsyncIOMotorClient
from app.config import MONGO_URI, DB_NAME

client = None
db = None

async def connect_db():
    global client, db
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    # Create indexes
    await db.chats.create_index([("bot_token", 1), ("chat_id", 1)], unique=True)

async def close_db():
    global client
    if client:
        client.close()

def get_db():
    return db
