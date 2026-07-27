/*CMD
  command: DT10K
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



var used = User.getProperty("donee")
if(!used){

// add your bjs here bot will run command only once per user
var bal = User.getProperty("balance") || 0;
  User.setProperty("balance", bal + 10000, "number");

  Api.sendMessage({
    chat_id: user.telegramid,
    text:
      "✅ SPECIAL Credits Added!\n" +
      "🎁 +10,000 credits added\n" +
      "💰 New Balance: " + (bal + 10000)
  });

User.setProperty("donee",true,"boolean")
}
