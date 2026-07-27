/*CMD
  command: /next
  help: 
  need_reply: false
  auto_retry_time: 
  folder: LOGIC

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: ⏭️, /next@sosunlimitedbot
  group: 
CMD*/

var bal = User.getProperty("balance") || 0;

if (bal < 5) {
  Api.sendMessage({
  on_result: "/saveLastBotMessage",
    chat_id: user.telegramid,
    text: "❌ Insufficient balance.\n\n💰 Required: 5\n💳 Your Balance: " + bal
  });
  return;
}

var n = User.getProperty("video_index");
if (!n || n < 1) {
  n = 1;
  User.setProperty("video_index", 1, "integer");
}

var channelId = User.getProperty("CHANNEL_ID");
var startId = Bot.getProperty("START_MSG_ID");

var msgId = startId + n - 1;

// IMPORTANT: advance index BEFORE trying
User.setProperty("video_index", n + 1, "integer");

Api.copyMessage({
  chat_id: chat.chatid,
  from_chat_id: channelId,
  message_id: msgId,
  on_result: "afterSend"
});

