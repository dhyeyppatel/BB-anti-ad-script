/*
    Command: /saveLastBotMessage
    Triggered by: on_result of Api.sendMessage
*/

if (!options || !options.result) {
    return; // Safety check
}

let messageId = options.result.message_id;

// Save the ID of the last message sent by the bot
Bot.setProperty("lastBotMessageId_" + chat.chatid, messageId, "integer");
