/*
    Command: /cleanupCron
    Description: Run every 5-10 minutes using Bot.run() or Auto Retry.
*/

let lastBotMsgId = Bot.getProperty("lastBotMessageId_" + chat.chatid);
let lastUserMsgId = Bot.getProperty("lastUserMessageId_" + chat.chatid);

if (!lastBotMsgId) {
    // Nothing sent yet
    return;
}

lastUserMsgId = lastUserMsgId || 0;

if (lastUserMsgId > lastBotMsgId) {
    // The user sent a message after the bot. 
    // Usually, BB App appends ads immediately after the bot sends a message.
    // If the user's message ID is higher, the ad (if any) might already be buried or handled.
    // However, to be perfectly clean, you might still want to check.
    // For this algorithm, we assume we only clean up trailing bot messages.
    return;
}

// Send an invisible checker message (Chat Action doesn't return message_id, so we send a deleted message)
// We use a zero-width space or a simple dot.
Api.sendMessage({
    chat_id: chat.chatid,
    text: "...", // A tiny dot or invisible char
    on_result: "/onCheckerDelivered"
});

// Reschedule cron for this chat
// Bot.run({
//     command: "/cleanupCron",
//     run_after: 60 * 10, // 10 minutes
//     chat_id: chat.chatid
// });
