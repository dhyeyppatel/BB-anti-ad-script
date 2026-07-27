/*CMD
  command: /sub
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Credits

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// /sub user_id amount

if (user.telegramid != 1123135015) {
  Api.sendMessage({ text: "❌ You are not authorized." });
  return;
}

if (!params) {
  Api.sendMessage({ text: "Usage:\n/sub user_id amount" });
  return;
}

var p = params.trim().split(/\s+/); // FIX spacing
var uid = p[0];
var amt = parseInt(p[1]);

if (!uid || isNaN(amt) || amt <= 0) {
  Api.sendMessage({ text: "❌ Invalid user id or amount." });
  return;
}

// queue negative balance
var key = "admin_add_" + uid;
var queued = Bot.getProperty(key) || 0;
Bot.setProperty(key, queued - amt, "number");

// notify user immediately
Api.sendMessage({
  chat_id: uid,
  text:
    "⚠️ *Admin Balance Deduction*\n\n" +
    "➖ Amount: *" + amt + " credits*\n" +
    "ℹ️ It will be applied when you open the bot (/start).",
  parse_mode: "Markdown"
});

// notify admin
Api.sendMessage({
  chat_id: user.telegramid,
  text:
    "✅ Deduction queued\n" +
    "User: " + uid + "\n" +
    "Amount: " + amt
});

