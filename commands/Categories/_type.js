/*CMD
  command: /type
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Categories
  answer: Open @SosUnlimitedbot to make changes.

  <<KEYBOARD

  KEYBOARD
  aliases: /type@sosunlimitedbot
  group: 
CMD*/

Api.sendMessage({
  chat_id: user.telegramid,
  text: "*Change Category.*",
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [{text: "Brazzers Premium 👀",callback_data: "/brazzers"}],
      [{text: "Desi 🥸",callback_data: "/desi"}],
      [{text: "Japanese 🎌",callback_data: "/jap"}],
      [{text: "Tamil 1",callback_data: "/tamil"},{text: "Tamil 2",callback_data: "/tamil2"}],
      [{text: "Telugu",callback_data: "/telugu"}],
      [{text: "Unrated Movies",callback_data: "/unrated"}],
    ]
  }
})

