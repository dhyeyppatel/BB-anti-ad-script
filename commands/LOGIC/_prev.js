/*CMD
  command: /prev
  help: 
  need_reply: false
  auto_retry_time: 
  folder: LOGIC

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: ⏮️
  group: 
CMD*/

var n = User.getProperty("video_index") || 1;

// prev = n - 2
var newIndex = n - 2;
if (newIndex < 1) newIndex = 1;

User.setProperty("video_index", newIndex, "integer");

Bot.run({ command: "/next" });

