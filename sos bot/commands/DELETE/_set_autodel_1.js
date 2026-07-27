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
  Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: chat.chatid,
  text: "❌ Invalid number. Try again.",
  on_result: "/saveLastBotMessage"
});
  return;
}

Bot.setProperty("AUTO_DELETE", val, "integer");

Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: chat.chatid,
  text: "✅ Auto-delete time set to: " + val + " seconds",
  on_result: "/saveLastBotMessage"
});

