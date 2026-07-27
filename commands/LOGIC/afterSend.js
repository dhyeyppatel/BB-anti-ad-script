Bot.runCommand("/saveLastBotMessage", options);
/*CMD
  command: afterSend
  help: 
  need_reply: false
  auto_retry_time: 
  folder: LOGIC
  answer: Forward to saved. It will be deleted in 5 mins.

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// This command is called ONLY if copyMessage succeeds
//Command: /removeMsg

// user can run this command manually
if(!options){ return }
if(!options.result.message_id){ return }

// extract time delay
let runAfter = parseInt(params);

// run message removing after "runAfter" minutes
Bot.run({
  command: "removeMsg",
  options: { message_id: options.result.message_id },
  run_after: 5 * 60 // one minutes
})
var bal = User.getProperty("balance");
User.setProperty("balance", bal - 5, "number");
if (!options || !options.message_id) {
  return;
}

// Nothing else is required here
// video_index was already incremented in /next

