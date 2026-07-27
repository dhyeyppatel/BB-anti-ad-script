/*CMD
  command: /pay
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Credits
  answer: Open @SosUnlimitedbot to pay.

  <<KEYBOARD

  KEYBOARD
  aliases: /pay@sosunlimitedbot
  group: 
CMD*/

var caption = "Send screenshot after payment to @CThreadpaybot only."

Api.sendPhoto({
  chat_id: user.telegramid,
  photo: "https://ar-hosting.pages.dev/1767775741427.png",
  caption: caption,
   protect_content: true   // uncomment if you want protection
})
