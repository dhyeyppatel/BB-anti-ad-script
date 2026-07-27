/*CMD
  command: /onCheckerDelivered
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

let checkerMsgId = options.result.message_id;
let lastBotMsgId = Bot.getProperty("lastBotMessageId_" + chat.chatid);

if (lastBotMsgId) {
    let gap = checkerMsgId - lastBotMsgId;
    if (gap > 1) {
        for (let i = lastBotMsgId + 1; i < checkerMsgId; i++) {
            Api.deleteMessage({ chat_id: chat.chatid, message_id: i });
        }
    }
}

Api.deleteMessage({ chat_id: chat.chatid, message_id: checkerMsgId });

Bot.run({
    command: "/cleanupCron",
    run_after: 600,
    chat_id: chat.chatid
});
