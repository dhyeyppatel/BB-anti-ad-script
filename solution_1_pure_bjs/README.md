# Solution 1: Pure BJS Anti-Ad

This solution entirely resides within the Bots.Business (BB) application. It relies on BJS (Bots.Business JavaScript) and requires no external databases or APIs. 

---

## 🛠️ Setup Guide

1. **Open your Bot** in the Bots.Business App.
2. Navigate to **Commands**.
3. Create the following commands and paste the respective code:
   
   - **Command 1: `/saveLastBotMessage`**
     - Paste the contents of `commands/2_save_last_bot_message.js`.
   
   - **Command 2: `*` (Universal Listener)**
     - Paste the contents of `commands/3_universal_listener.js`.
   
   - **Command 3: `/cleanupCron`**
     - Paste the contents of `commands/4_cleanup_cron.js`.
   
   - **Command 4: `/onCheckerDelivered`**
     - Paste the contents of `commands/5_on_checker_delivered.js`.

---

## 🚀 How to Use

1. **Modify your existing commands:**
   Every time your bot sends a message (e.g., via `Api.sendMessage` or `Api.sendPhoto`), you must add `on_result: "/saveLastBotMessage"`.
   
   *Example:*
   ```javascript
   Api.sendMessage({
       chat_id: chat.chatid,
       text: "Hello! This is a message from the bot.",
       on_result: "/saveLastBotMessage"  // <-- ADD THIS LINE
   });
   ```
   *(See `1_send_message_wrapper.js` for examples).*

2. **Start the Cleanup Cycle:**
   Send `/cleanupCron` to your bot once. You can uncomment the `Bot.run` block inside `4_cleanup_cron.js` so it automatically reschedules itself every 10 minutes.

---

## 🌐 How to Deploy

**No external deployment is required!** 
Because this is Pure BJS, everything runs directly inside Bots.Business. Just make sure the `/cleanupCron` command is set to run periodically via Auto Retry or `Bot.run()`.

---

## ⚠️ Limitations
- **Volume Limit:** If your bot is in extremely high-traffic chats, deleting many message IDs one-by-one can hit Telegram API limits (`429 Too Many Requests`).
- **Code Overhead:** You must append the `on_result` parameter to *every single* message your bot sends.
