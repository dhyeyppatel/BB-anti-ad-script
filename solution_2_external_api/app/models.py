from pydantic import BaseModel

class RegisterRequest(BaseModel):
    bot_token: str
    chat_id: int
    message_id: int

class CleanupRequest(BaseModel):
    bot_token: str
    chat_id: int
