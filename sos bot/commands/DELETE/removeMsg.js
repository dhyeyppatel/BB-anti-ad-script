/*CMD
  command: removeMsg
  help: 
  need_reply: false
  auto_retry_time: 
  folder: DELETE

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

//command : removeMsg
if(!options){ return }

// remove message
Api.deleteMessage({
  message_id: options.message_id
})
