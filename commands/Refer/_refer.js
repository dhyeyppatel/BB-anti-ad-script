/*CMD
  command: /refer
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Refer

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 👥, /refer@sosunlimitedbot
  group: 
CMD*/

var total_ref = Bot.getProperty("total_ref"+user.telegramid) == undefined ?0:Bot.getProperty("total_ref"+user.telegramid)
Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: chat.chatid,
  text: "*💰 Invite Users And Earn 50 POINT\n\n💹 Your Link : https://t.me/" +
    bot.name +
    "?start=" +
    user.telegramid +
    "\n\n🎯 You Invited : "+total_ref+" Users*"
,
  on_result: "/saveLastBotMessage"
})

