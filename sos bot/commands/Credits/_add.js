/*CMD
  command: /add
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

// /add user_id amount

if (user.telegramid != 1123135015) {
  Api.sendMessage({
  on_result: "/saveLastBotMessage", text: "❌ You are not authorized." });
  return;
}

if (!params) {
  Api.sendMessage({
  on_result: "/saveLastBotMessage", text: "Usage:\n/add user_id amount" });
  return;
}

var p = params.split(" ");
var uid = p[0];
var amt = parseInt(p[1]);

if (!uid || isNaN(amt)) {
  Api.sendMessage({
  on_result: "/saveLastBotMessage", text: "❌ Invalid user id or amount." });
  return;
}

// queue admin credit
var key = "admin_add_" + uid;
var queued = Bot.getProperty(key) || 0;
Bot.setProperty(key, queued + amt, "number");

// 🔔 notify user immediately
Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: uid,
  text:
    "💰 *Admin Credit Added*\n\n" +
    "➕ Amount: *" + amt + " credits*\n" +
    "ℹ️ It will be applied when you open the bot (/start).",
  parse_mode: "Markdown"
});

// notify admin
Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: user.telegramid,
  text:
    "✅ Credit queued successfully\n" +
    "User ID: " + uid + "\n" +
    "Amount: " + amt
});

