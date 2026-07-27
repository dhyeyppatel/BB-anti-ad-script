/*CMD
  command: /bal
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Credits
  answer: Open @SosUnlimitedbot to check balance.

  <<KEYBOARD

  KEYBOARD
  aliases: /bal@sosunlimitedbot
  group: 
CMD*/

// /balance

var bal = User.getProperty("balance");
if (bal === undefined || bal === null) bal = 0;

Api.sendMessage({
  chat_id: user.telegramid,
  text: "💰 *Your Current Balance*\n\nCredits: *" + bal + "*",
  parse_mode: "Markdown"
});

