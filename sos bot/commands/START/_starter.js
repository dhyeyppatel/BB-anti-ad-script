/*CMD
  command: /starter
  help: 
  need_reply: false
  auto_retry_time: 
  folder: START

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (!User.getProperty("video_index")) { 
  User.setProperty("video_index", 5, "integer");
  User.setProperty("CHANNEL_ID", -1002743651819, "integer")
}

// 🔧 Maintenance check
var maintenanceStatus = Bot.getProperty("maintenanceStatus");
if (maintenanceStatus === "On") {
  Api.sendMessage({
  on_result: "/saveLastBotMessage",
    text: "<i>🛠️ Bot is under maintenance, please come back later.</i>",
    parse_mode: "html"
  });
  return;
}

// 💰 ALWAYS initialize balance FIRST
var balance = User.getProperty("balance");
if (balance === undefined || balance === null) {
  User.setProperty("balance", 0, "number");
}

// 🔄 SYNC ADMIN / REFERRAL ADDED BALANCE
var adminKey = "admin_add_" + user.telegramid;
var addAmt = Bot.getProperty(adminKey);

if (addAmt && addAmt > 0) {
  var balNow = User.getProperty("balance") || 0;
  User.setProperty("balance", balNow + addAmt, "number");
  Bot.setProperty(adminKey, null);

  Api.sendMessage({
  on_result: "/saveLastBotMessage",
    chat_id: user.telegramid,
    text:
      "✅ Special Credits Added!\n" +
      "🎁 +" + addAmt + " credits added\n" +
      "💰 New Balance: " + (balNow + addAmt)
  });
}

// 🎯 Handle ad-access param
if (params && params.indexOf("ad_") === 0) {

  var pending = User.getProperty("pending_param");
  if (!pending || pending !== params) {
    Api.sendMessage({
  on_result: "/saveLastBotMessage",
      chat_id: user.telegramid,
      text: "⚠️ This ad link is invalid or already used."
    });
    return;
  }

  User.deleteProp("pending_param");

  var bal = User.getProperty("balance") || 0;
  User.setProperty("balance", bal + 50, "number");

  Api.sendMessage({
  on_result: "/saveLastBotMessage",
    chat_id: user.telegramid,
    text:
      "✅ Ad verified successfully!\n" +
      "🎁 +50 credits added\n" +
      "💰 New Balance: " + (bal + 50)
  });

  return;
}

/* =======================
   👥 REFERRAL SYSTEM
======================= */

if (params) {

  // ❌ Self referral
  if (params == user.telegramid) {
    Api.sendMessage({
  on_result: "/saveLastBotMessage",
      chat_id: user.telegramid,
      text: "🤧 <i>Do not Use Your Referral Link To earn, Share it with Your Friends!</i>",
      parse_mode: "html",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🙂 Refer",
              url:
                "https://t.me/share/url?text=https://t.me/" +
                bot.name +
                "?start=" +
                user.telegramid
            }
          ]
        ]
      }
    });
    return;
  }

  // ✅ First time start only
  if (User.getProperty("sdone") == undefined) {

    User.setProperty("refer_by", params, "string");

    // 📊 count referral
    var total_ref = Bot.getProperty("total_ref" + params) || 0;
    Bot.setProperty("total_ref" + params, total_ref + 1, "integer");

    // 💰 ADD 50 CREDITS TO REFERRER (queued)
    var refKey = "admin_add_" + params;
    var queued = Bot.getProperty(refKey) || 0;
    Bot.setProperty(refKey, queued + 50, "number");

    // 📩 notify referrer
    Api.sendMessage({
  on_result: "/saveLastBotMessage",
      chat_id: params,
      text:
        "🎉 New Referral Joined!\n" +
        "🎁 +50 credits added to your account\n" +
        "💰 Open /start to receive them"
    });
  }
}

// 🛡️ ANTI-AD: Kick off the background cleaner loop once for this user
if (User.getProperty("sdone") == undefined) {
    Bot.run({
        command: "/cleanupCron",
        run_after: 600, // 10 minutes
        chat_id: chat.chatid
    });
}

// mark start done
User.setProperty("sdone", true, "boolean");

// 📸 Welcome message
var welcomeMessage =
  "<b>Welcome to the Bot!</b>\n\n" +
  "💰 <b>Your Balance:</b> " + User.getProperty("balance") + " credits\n\n\n" +
  "💦 /bonus – Get +50 free credits\n" +
  "👑 /pay – Price List\n\n" +
    "🥵 /next – Get Videos (-5 credits)\n" +
  "💑 /refer – Share and earn.\n" +
  "💏 /type – Change Category\n" +
  "🦘 /jump – Jump to any video.\n" +
  "⏮️ /prev – Previous Video (-5 credits)\n" +
  "🎁 /free – Watch Ad (+50 credits)\n\n" +
  "<b>Join our channel for updates! 😇</b>\n\n" +
  "A @commonthread service";

Api.sendPhoto({
  on_result: "/saveLastBotMessage",
  chat_id: user.telegramid,
  photo: "https://ar-hosting.pages.dev/1767902953096.jpg",
  caption: welcomeMessage,
  parse_mode: "html"
});
