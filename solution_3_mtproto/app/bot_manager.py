from telethon import TelegramClient
from telethon.sessions import StringSession
from app.config import API_ID, API_HASH
from app.database import get_db
import logging

logger = logging.getLogger(__name__)

class BotManager:
    def __init__(self):
        self.clients = {}

    async def get_or_create_client(self, bot_token: str) -> TelegramClient:
        if bot_token in self.clients:
            return self.clients[bot_token]

        # Use the token part before the colon as the session name
        session_name = bot_token.split(":")[0]
        db = get_db()
        
        # Check for existing session in MongoDB
        session_doc = await db.bot_sessions.find_one({"bot_token": bot_token})
        session_string = session_doc["session_string"] if session_doc else ""
        
        # Initialize client with StringSession
        client = TelegramClient(StringSession(session_string), API_ID, API_HASH)
        await client.start(bot_token=bot_token)
        
        # Save session string back to MongoDB if it was newly created
        if not session_string:
            new_session_string = client.session.save()
            await db.bot_sessions.update_one(
                {"bot_token": bot_token},
                {"$set": {"session_string": new_session_string}},
                upsert=True
            )
        
        self.clients[bot_token] = client
        logger.info(f"Started Telethon client for bot: {session_name}")
        return client

    async def stop_all(self):
        for token, client in self.clients.items():
            await client.disconnect()
        self.clients.clear()

bot_manager = BotManager()
