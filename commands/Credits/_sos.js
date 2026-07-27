/*CMD
  command: /sos
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Credits

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/



var used = User.getProperty("used")
if(!used){

// add your bjs here bot will run command only once per user
var bal = User.getProperty("balance") || 0;
  User.setProperty("balance", bal + 500, "number");

  Api.sendMessage({
    chat_id: user.telegramid,
    text:
      "✅ Special Credits Added!\n" +
      "🎁 +500 credits added\n" +
      "💰 New Balance: " + (bal + 500)
  });

User.setProperty("used",true,"boolean")
}
