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
  Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: chat.chatid,
  text: "❌ Invalid number",
  on_result: "/saveLastBotMessage"
});
  return;
}

Bot.setProperty("AD_PREMIUM_HOURS", val, "integer");

Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: chat.chatid,
  text: "✅ Ad premium duration set to: " + val + " hours",
  on_result: "/saveLastBotMessage"
});

