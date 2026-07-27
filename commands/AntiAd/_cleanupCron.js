/*CMD
  command: /cleanupCron
  help: 
  need_reply: false
  auto_retry_time: 
  folder: AntiAd
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let lastBotMsgId = Bot.getProperty("lastBotMessageId_" + chat.chatid);
if (!lastBotMsgId) { return; }

Api.sendMessage({
  on_result: "/saveLastBotMessage",
    chat_id: chat.chatid,
    text: ".", 
    on_result: "/onCheckerDelivered"
});
