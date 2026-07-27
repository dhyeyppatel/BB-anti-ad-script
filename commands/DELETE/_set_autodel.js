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
  Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: chat.chatid,
  text: "❌ Admin only",
  on_result: "/saveLastBotMessage"
});
  return;
}

if (request.data) {
  Api.deleteMessage({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id
  });
}

Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: chat.chatid,
  text: "⏱ Send auto-delete time in *seconds* (example: 600)");
Bot.runCommand("/set_autodel_1",
  on_result: "/saveLastBotMessage"
});

