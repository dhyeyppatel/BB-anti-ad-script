# Solution 2: External API Service

This solution moves the anti-ad logic outside of the Bots.Business bot. The bot only registers its sent messages to this REST API. The API then handles the logic of detecting and deleting ads.

---

## 🛠️ Setup Guide (Local Testing)

1. **Install Python:** Ensure you have Python 3.9+ installed.
2. **Clone the Project:** Open this directory (`solution_2_external_api`) in your terminal.
3. **Create a Virtual Environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
4. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
5. **Configure MongoDB:** 
   Your MongoDB Atlas URL is already hardcoded in `app/config.py` as requested. If you want to change it later, edit that file or set the `MONGO_URI` environment variable.

6. **Run the API:**
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

---

## 🚀 How to Use

**1. Register Messages from BB App:**
Whenever your bot sends a message in BB App, call this API to register it.

```javascript
Api.sendMessage({
    chat_id: chat.chatid,
    text: "Hello",
    on_result: "/apiRegister"
});
```

In the `/apiRegister` command:
```javascript
let token = bot.token; 
HTTP.post({
    url: "https://YOUR_API_DOMAIN.com/register",
    body: {
        "bot_token": token,
        "chat_id": chat.chatid,
        "message_id": options.result.message_id
    }
});
```

**2. Trigger Cleanup:**
You can set a cron in BB App to trigger cleanup for a chat:
```javascript
HTTP.post({
    url: "https://YOUR_API_DOMAIN.com/cleanup",
    body: {
        "bot_token": bot.token,
        "chat_id": chat.chatid
    }
});
```

---

## 🌐 How to Deploy (Production)

We recommend deploying this API to a VPS (like DigitalOcean, Hetzner, or AWS) or a PaaS (like Render, Heroku).

### Option A: Deploy on Render.com (Easiest)
1. Push this folder to a GitHub repository.
2. Go to [Render](https://render.com) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Settings:
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Click **Deploy**. Render will give you a public URL (e.g., `https://my-api.onrender.com`). Use this URL in your BJS `HTTP.post` calls.

### Option B: Deploy on a Linux VPS (Ubuntu)
1. SSH into your VPS and install Python and Git:
   ```bash
   sudo apt update && sudo apt install python3-pip python3-venv git -y
   ```
2. Clone/Upload this folder to the VPS.
3. Create a virtual environment and install dependencies (see Setup Guide).
4. Run with Gunicorn for production:
   ```bash
   pip install gunicorn
   gunicorn -k uvicorn.workers.UvicornWorker -b 0.0.0.0:80 app.main:app
   ```
5. *(Optional but recommended)* Set up a reverse proxy using Nginx to handle HTTPS.
