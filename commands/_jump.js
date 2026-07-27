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
  Bot.sendMessage(
    "Please send START_MSG_ID number (example: 5)"
  );
  return;
}

// User replied — save the answer
var startId = parseInt(message);

if (isNaN(startId)) {
  Bot.sendMessage("❌ Please send a valid number.");
  return;
}

User.setProperty("video_index", startId, "integer");
//User.setProperty("START_MSG_ID", startId, "integer");

Bot.sendMessage(
  "✅ Index saved: " + startId
);
