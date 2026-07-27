/*CMD
  command: /admin
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

Bot.setProperty("ADMIN_ID", 1123135015, "integer");

if (user.telegramid !== Bot.getProperty("ADMIN_ID")) {
  Api.sendMessage({
  on_result: "/saveLastBotMessage",
    chat_id: chat.chatid,
    text: "❌ Access denied"
  });
  return;
}

Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: chat.chatid,
  text: "⚙️ Admin Panel",
  reply_markup: {
    inline_keyboard: [
      [{ text: "⏱ Auto Delete Time", callback_data: "/set_autodel" }],
      [{ text: "📉 Free Daily Limit", callback_data: "/set_free_limit" }],
      [{ text: "📈 Premium Daily Limit", callback_data: "/set_premium_limit" }],
      [{ text: "🔐 Forward Protection", callback_data: "/toggle_forward" }],
      [{ text: "🔔 Force Subscribe", callback_data: "/toggle_forcesub" }],
      [{ text: "📢 Set Force Channel", callback_data: "/set_force_channel" }],
      [{ text: "⭐ Ad Premium Hours", callback_data: "/set_ad_hours" }]
    ]
  }
});

