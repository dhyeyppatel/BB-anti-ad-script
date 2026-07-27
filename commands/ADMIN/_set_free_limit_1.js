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
  Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: chat.chatid,
  text: "❌ Invalid number",
  on_result: "/saveLastBotMessage"
});
  return;
}

Bot.setProperty("FREE_LIMIT", val, "integer");

Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: chat.chatid,
  text: "✅ Free daily limit set to: " + val,
  on_result: "/saveLastBotMessage"
});

