/*CMD
  command: /set_force_channel_1
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

Bot.setProperty("FORCE_SUB_CHANNEL", message, "string");

Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: chat.chatid,
  text: "✅ Force subscribe channel set to:\n" + message,
  on_result: "/saveLastBotMessage"
});

