from app.database import get_db
from app.bot_manager import bot_manager
from telethon.errors import RPCError
import logging

logger = logging.getLogger(__name__)

# Typical keywords injected by Bots.Business
AD_KEYWORDS = [
    "Created in Bots.Business",
    "bots.business",
    "Created via Bots.Business"
]

async def scan_and_clean_messages():
    """
    APScheduler job to check pending messages.
    """
    db = get_db()
    # Find all messages that haven't been checked yet
    cursor = db.monitored_messages.find({"status": "pending"})
    
    async for doc in cursor:
        bot_token = doc["bot_token"]
        chat_id = doc["chat_id"]
        message_id = doc["message_id"]
        _id = doc["_id"]

        try:
            client = await bot_manager.get_or_create_client(bot_token)
            
            # Fetch the last 10 messages in the chat
            messages = await client.get_messages(chat_id, limit=10)
            if not messages:
                await db.monitored_messages.update_one({"_id": _id}, {"$set": {"status": "not_found"}})
                continue
                
            ad_found = False
            for msg in messages:
                msg_text = msg.text or ""
                
                # Check if it was modified
                is_modified = any(keyword.lower() in msg_text.lower() for keyword in AD_KEYWORDS)
                
                if is_modified:
                    logger.info(f"Ad detected in message {msg.id} (chat: {chat_id}). Deleting.")
                    await client.delete_messages(chat_id, [msg.id])
                    ad_found = True

            if ad_found:
                await db.monitored_messages.update_one({"_id": _id}, {"$set": {"status": "deleted"}})
            else:
                logger.info(f"No ad found in recent history (chat: {chat_id}).")
                await db.monitored_messages.update_one({"_id": _id}, {"$set": {"status": "checked_clean"}})
                
        except RPCError as e:
            logger.error(f"Telegram RPC error for chat {chat_id}, msg {message_id}: {e}")
            await db.monitored_messages.update_one({"_id": _id}, {"$set": {"status": "rpc_error", "error": str(e)}})
        except Exception as e:
            logger.error(f"Unexpected error: {e}")
