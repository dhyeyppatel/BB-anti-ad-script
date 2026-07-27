/*CMD
  command: /onShortLink
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Ads

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var shortUrl = content;

if (!shortUrl) {
  Api.sendMessage({
  on_result: "/saveLastBotMessage",
    chat_id: user.telegramid,
    text: "❌ Failed to generate ad link. Try again."
  });
  return;
}

var buttons = [
  [
    { text: "▶️ Watch Ad", url: shortUrl }
  ]
];

Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: user.telegramid,
  text: "🎥 Watch the ad to unlock credits:",
  reply_markup: {
    inline_keyboard: buttons
  }
});

