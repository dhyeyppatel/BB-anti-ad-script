/*CMD
  command: /set_force_channel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ADMIN

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (user.telegramid !== Bot.getProperty("ADMIN_ID")) {
  Bot.sendMessage("❌ Admin only");
  return;
}

Bot.sendMessage("📢 Send channel username (with @) or channel ID");
Bot.runCommand("/set_force_channel_1");

