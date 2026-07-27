if (!options || !options.result) { return; }

let messageId = options.result.message_id;
Bot.setProperty("lastBotMessageId_" + chat.chatid, messageId, "integer");
