/*CMD
  command: /set_ad_hours_1
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

Bot.setProperty("AD_PREMIUM_HOURS", val, "integer");

Bot.sendMessage("✅ Ad premium duration set to: " + val + " hours");

