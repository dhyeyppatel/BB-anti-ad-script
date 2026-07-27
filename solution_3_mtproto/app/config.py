import os

# Telegram API credentials (from my.telegram.org)
API_ID = int(os.getenv("API_ID", "1234567")) # REPLACE WITH YOUR API ID
API_HASH = os.getenv("API_HASH", "your_api_hash_here") # REPLACE WITH YOUR API HASH

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = "bb_anti_ad"
