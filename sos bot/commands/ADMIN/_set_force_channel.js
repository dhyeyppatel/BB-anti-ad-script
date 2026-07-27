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
  Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: chat.chatid,
  text: "❌ Admin only",
  on_result: "/saveLastBotMessage"
});
  return;
}

Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: chat.chatid,
  text: "📢 Send channel username (with @) or channel ID");
Bot.runCommand("/set_force_channel_1",
  on_result: "/saveLastBotMessage"
});

