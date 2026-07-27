/*
    Example of how to send messages in your bot.
    You MUST append the `on_result` parameter to every API call that sends a message.
*/

Api.sendMessage({
    chat_id: chat.chatid,
    text: "Hello! This is a message from the bot.",
    on_result: "/saveLastBotMessage"
});

// For photos:
/*
Api.sendPhoto({
    chat_id: chat.chatid,
    photo: "URL_OR_FILE_ID",
    caption: "Here is a photo",
    on_result: "/saveLastBotMessage"
});
*/
