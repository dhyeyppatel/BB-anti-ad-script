import os

# Default values provided by the user for deployment readiness
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = "bots_anti_ad"
