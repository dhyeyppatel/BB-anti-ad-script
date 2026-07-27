/*CMD
  command: /set_free_limit_1
  help: 
  need_reply: true
  auto_retry_time: 
  folder: ADMIN

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var val = parseInt(message);

if (!val || val < 1) {
  Bot.sendMessage("❌ Invalid number");
  return;
}

Bot.setProperty("FREE_LIMIT", val, "integer");

Bot.sendMessage("✅ Free daily limit set to: " + val);

