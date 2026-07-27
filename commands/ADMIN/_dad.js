/*CMD
  command: /dad
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

// Admin only
if (user.telegramid !== Bot.getProperty("ADMIN_ID")) {
  Bot.sendMessage("❌ Admin only");
  return;
}

// Read all properties safely
var autoDel = Bot.getProperty("AUTO_DELETE");
var freeLimit = Bot.getProperty("FREE_LIMIT");
var premLimit = Bot.getProperty("PREMIUM_LIMIT");
var forwardProtect = Bot.getProperty("FORWARD_PROTECT");
var forceSub = Bot.getProperty("FORCE_SUB");
var forceChannel = Bot.getProperty("FORCE_SUB_CHANNEL");
var adHours = Bot.getProperty("AD_PREMIUM_HOURS");
var channelId = Bot.getProperty("CHANNEL_ID");
var startMsg = Bot.getProperty("START_MSG_ID");

// Fallbacks if not set
autoDel = autoDel !== undefined ? autoDel : "Not set";
freeLimit = freeLimit !== undefined ? freeLimit : "Not set";
premLimit = premLimit !== undefined ? premLimit : "Not set";
forwardProtect = forwardProtect ? "ON" : "OFF";
forceSub = forceSub ? "ON" : "OFF";
forceChannel = forceChannel || "Not set";
adHours = adHours !== undefined ? adHours : "Not set";
channelId = channelId || "Not set";
startMsg = startMsg || "Not set";

// Build message
var text =
  "⚙️ *Bot Configuration*\n\n" +
  "📦 *Storage Channel ID:* `" + channelId + "`\n" +
  "🎬 *Start Message ID:* `" + startMsg + "`\n\n" +
  "⏱ *Auto Delete:* `" + autoDel + "` sec\n" +
  "📉 *Free Daily Limit:* `" + freeLimit + "`\n" +
  "📈 *Premium Daily Limit:* `" + premLimit + "`\n\n" +
  "🔐 *Forward Protection:* *" + forwardProtect + "*\n" +
  "🔔 *Force Subscribe:* *" + forceSub + "*\n" +
  "📢 *Force Channel:* `" + forceChannel + "`\n\n" +
  "⭐ *Ad Premium Hours:* `" + adHours + "`\n";

Bot.sendMessage(text, { parse_mode: "Markdown" });

