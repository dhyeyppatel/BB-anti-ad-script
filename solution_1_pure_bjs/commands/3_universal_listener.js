/*
    Command: *
    Description: Universal listener for incoming user messages
*/

if (request && request.message && request.message.message_id) {
    let msgId = request.message.message_id;
    // Store the last user message ID
    Bot.setProperty("lastUserMessageId_" + chat.chatid, msgId, "integer");
}
