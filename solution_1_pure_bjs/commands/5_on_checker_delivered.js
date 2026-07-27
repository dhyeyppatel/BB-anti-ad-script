/*
    Command: /onCheckerDelivered
    Triggered by: on_result of the checker message in /cleanupCron
*/

if (!options || !options.result) {
    return;
}

let checkerMessageId = options.result.message_id;
let lastBotMsgId = Bot.getProperty("lastBotMessageId_" + chat.chatid);

if (!lastBotMsgId) {
    return;
}

// Delete messages between lastBotMsgId + 1 and checkerMessageId
// This deletes any BB Ads inserted in between, and also the checker message itself.
for (let i = lastBotMsgId + 1; i <= checkerMessageId; i++) {
    Api.deleteMessage({
        chat_id: chat.chatid,
        message_id: i
    });
}
