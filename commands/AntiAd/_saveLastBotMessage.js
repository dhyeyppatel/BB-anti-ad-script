/*CMD
  command: /saveLastBotMessage
  help: 
  need_reply: false
  auto_retry_time: 
  folder: AntiAd
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (!options || !options.result) { return; }

let messageId = options.result.message_id;
Bot.setProperty("lastBotMessageId_" + chat.chatid, messageId, "integer");
