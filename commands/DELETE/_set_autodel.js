/*CMD
  command: /set_autodel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: DELETE

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

if (request.data) {
  Api.deleteMessage({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id
  });
}

Bot.sendMessage("⏱ Send auto-delete time in *seconds* (example: 600)");
Bot.runCommand("/set_autodel_1");

