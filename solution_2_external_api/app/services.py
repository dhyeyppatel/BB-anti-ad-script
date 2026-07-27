import httpx
import logging

logger = logging.getLogger(__name__)

async def run_cleanup(bot_token: str, chat_id: int, last_bot_message_id: int) -> dict:
    """
    Executes the cleanup logic:
    1. Sends an invisible checker message to get its message_id.
    2. Deletes messages from last_bot_message_id + 1 up to checker_message_id.
    """
    api_url = f"https://api.telegram.org/bot{bot_token}"
    
    async with httpx.AsyncClient() as client:
        # 1. Send invisible checker message (e.g. dot or zero-width space)
        res = await client.post(f"{api_url}/sendMessage", json={
            "chat_id": chat_id,
            "text": ".",
            "disable_notification": True
        })
        
        data = res.json()
        if not data.get("ok"):
            logger.error(f"Failed to send checker message: {data}")
            return {"success": False, "error": data.get("description")}
        
        checker_msg_id = data["result"]["message_id"]
        deleted_count = 0
        
        # 2. Delete messages between last_bot_message_id and checker_msg_id
        for msg_id in range(last_bot_message_id + 1, checker_msg_id + 1):
            del_res = await client.post(f"{api_url}/deleteMessage", json={
                "chat_id": chat_id,
                "message_id": msg_id
            })
            if del_res.json().get("ok"):
                deleted_count += 1

        return {"success": True, "deleted": deleted_count, "checker_id": checker_msg_id}
