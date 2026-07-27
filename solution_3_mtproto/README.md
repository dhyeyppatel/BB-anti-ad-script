# Solution 3: Python Backend Using MTProto

This is the most robust solution. It uses Telethon (MTProto) to log in as the bot, read the *actual text* of sent messages, and delete them if they contain Bots.Business injected ads. It is designed to scale to thousands of bots by using the "Universal Listener Webhook" method.

---

## 🚀 How to Use (The Universal Listener Webhook)

Thanks to MTProto, you **do not** need to edit every single `Api.sendMessage` in your bot. 
Instead, we just use a Universal Listener (`*`) to tell the backend which chats are currently active.

1. **Create a command `*` in Bots.Business.**
2. **Paste the following code:**

```javascript
let token = bot.token; 
HTTP.post({
    url: "https://YOUR_API_DOMAIN.com/register",
    body: {
        "bot_token": token,
        "chat_id": chat.chatid,
        "message_id": request.message.message_id
    }
});
```

*That's it!* 
Whenever a user interacts with your bot, this tells the Python server that the chat is active. 5 minutes later, the background Python worker fetches the last 10 messages of that chat via MTProto and deletes any ads it finds.

---

## 🌐 How to Deploy (Render.com)

Because we have upgraded this bot to store its MTProto sessions directly in **MongoDB** as raw strings, it is 100% compatible with ephemeral PaaS providers like **Render**.

### Step 1: Prepare Your Code
1. Push this folder (`solution_3_mtproto`) to a new GitHub repository.
2. Ensure you have your `MONGO_URI` ready (from MongoDB Atlas). 
3. Get your Telegram `API_ID` and `API_HASH` from [my.telegram.org](https://my.telegram.org).

### Step 2: Create a Web Service on Render
1. Go to [Render.com](https://render.com/) and create a new **Web Service**.
2. Connect your GitHub repository.
3. Configure the service:
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Step 3: Set Environment Variables
In the Render dashboard, go to your Web Service's **Environment** tab and add:
- `MONGO_URI` (your MongoDB Atlas URL)
- `API_ID` (your Telegram API ID)
- `API_HASH` (your Telegram API Hash)

### Step 4: Deploy
Click **Deploy**. Render will build your app and give you a public URL (e.g., `https://my-anti-ad.onrender.com`).

**Replace `https://YOUR_API_DOMAIN.com` in your Bots.Business `HTTP.post` code with this new Render URL.**

> **Note on Render's Free Tier:** Render's free tier spins down your server after 15 minutes of receiving no HTTP requests. This is perfectly fine! Because your bot sends an `HTTP.post` every time a user interacts with it, it will wake the server up instantly and keep it awake for 15 minutes. This gives the 5-minute background checker plenty of time to run and delete any ads before the server goes back to sleep.
