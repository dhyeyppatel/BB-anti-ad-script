/*CMD
  command: /clone
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

const ADMIN_ID = "1123135015";

if (request?.chat?.id == ADMIN_ID) {
  BBAdmin.installBot({
    email: "paneertikka203@gmail.com", // change with message if using WFA
    bot_id: "2841705" // change with bot.id for current bot
  });

  return Api.sendMessage({
  on_result: "/saveLastBotMessage",
  chat_id: chat.chatid,
  text: "Sent!",
  on_result: "/saveLastBotMessage"
});
}
