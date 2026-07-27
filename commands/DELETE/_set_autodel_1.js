/*CMD
  command: /set_autodel_1
  help: 
  need_reply: true
  auto_retry_time: 
  folder: DELETE

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var val = parseInt(message);

if (!val || val < 0) {
  Bot.sendMessage("❌ Invalid number. Try again.");
  return;
}

Bot.setProperty("AUTO_DELETE", val, "integer");

Bot.sendMessage("✅ Auto-delete time set to: " + val + " seconds");

