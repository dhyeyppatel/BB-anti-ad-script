/*CMD
  command: /jump
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: Please send to go to that number (example: 5)

  <<KEYBOARD

  KEYBOARD
  aliases: /jump@sosunlimitedbot
  group: 
CMD*/

// If this is the first run (no user answer yet)
if (!message) {
  Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: chat.chatid,
  text: "Please send START_MSG_ID number (example: 5)"
  ,
  on_result: "/saveLastBotMessage"
});
  return;
}

// User replied — save the answer
var startId = parseInt(message);

if (isNaN(startId)) {
  Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: chat.chatid,
  text: "❌ Please send a valid number.",
  on_result: "/saveLastBotMessage"
});
  return;
}

User.setProperty("video_index", startId, "integer");
//User.setProperty("START_MSG_ID", startId, "integer");

Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: chat.chatid,
  text: "✅ Index saved: " + startId
,
  on_result: "/saveLastBotMessage"
});
