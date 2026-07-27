/*CMD
  command: /setup
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

if (chat.chat_type !== "private")
  return Api.sendMessage({
  on_result: "/saveLastBotMessage", text: "❌ This command can only be used in private chat." });

var currentAdmin = Bot.getProperty("admin_id");

if (currentAdmin) {
  return Api.sendMessage({
  on_result: "/saveLastBotMessage",
    text: `🚫 Admin is already set to <code>${currentAdmin}</code>.\nOnly one admin is allowed.`,
    parse_mode: "HTML"
  });
}

Bot.setProperty("admin_id", user.telegramid, "string");

Api.sendMessage({
  on_result: "/saveLastBotMessage",
  text: `✅ Admin setup complete.\nYour Telegram ID <code>${user.telegramid}</code> is now saved as the bot admin.`,
  parse_mode: "HTML"
});

