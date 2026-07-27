/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: START
  answer: Use below buttons:
  keyboard: ⏮️,⏭️
  aliases: /start@sosunlimitedbot
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
    text: "<b>🛠 Maintenance Mode</b>\n\n<i>Please come back later.</i>",
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
      "🎉 <b>Credits Added!</b>\n\n" +
      "🎁 <b>Bonus:</b> +" + addAmt + " credits\n" +
      "💰 <b>Balance:</b> " + (balNow + addAmt),
    parse_mode: "html"
  });
}

// 🎯 Handle ad-access param
if (params && params.indexOf("ad_") === 0) {

  var pending = User.getProperty("pending_param");
  if (!pending || pending !== params) {
    Api.sendMessage({
  on_result: "/saveLastBotMessage",
      chat_id: user.telegramid,
      text: "⚠️ <i>This ad link is invalid or already used.</i>",
      parse_mode: "html"
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
      "✅ <b>Ad Verified!</b>\n\n" +
      "🎁 +50 credits added\n" +
      "💰 <b>Balance:</b> " + (bal + 50),
    parse_mode: "html"
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
      text:
        "🤧 <b>Oops!</b>\n\n" +
        "<i>You can’t use your own referral link.\nShare it with friends to earn!</i>",
      parse_mode: "html",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "📢 Share Referral Link",
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
        "🎉 <b>New Referral Joined!</b>\n\n" +
        "🎁 +50 credits added\n" +
        "💰 Open /start to receive them",
      parse_mode: "html"
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

// 📸 Welcome UI
var welcomeMessage =
  "<b>👋 Welcome!</b>\n" +
  "💰 <b>Your Balance:</b> <code>" + User.getProperty("balance") + "</code> credits\n\n" +
  "🎬 <b>Watch Videos</b>\n" +
  "🥵 /next – Next video (-5)\n" +
  "👑 /pay – Price list\n\n" +
  "<i>📢 Join our channel for updates!</i>\n" +
  "<b>A @commonthread service</b>";

Api.sendPhoto({
  on_result: "/saveLastBotMessage",
  chat_id: user.telegramid,
  photo: "https://ar-hosting.pages.dev/1767902953096.jpg",
  caption: welcomeMessage,
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "⏮️ Prev", callback_data: "/prev" },
        { text: "▶️ Next", callback_data: "/next" }
      ],
      [
        { text: "🦘 Jump", callback_data: "/jump" },
        { text: "💏 Category", callback_data: "/type" }
      ],
      [
        { text: "🎁 Bonus", callback_data: "/bonus" },
        { text: "📺 Free Ad", callback_data: "/free" }
      ],
      [
        { text: "💑 Refer", callback_data: "/refer" },
        { text: "👑 Pricing", callback_data: "/pay" }
      ],
      [
        { text: "📢 Join Channel", url: "https://t.me/commonthread" }
      ]
    ]
  }
});
