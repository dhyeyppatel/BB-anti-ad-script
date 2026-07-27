/*CMD
  command: /bonus
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Bonus

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 🎁, /bonus@sosunlimitedbot
  group: 
CMD*/

var bonus_amount = 50
var cooldown_hours = 24
var cooldown_ms = cooldown_hours * 60 * 60 * 1000

// get balance
var bal = User.getProperty("balance") || 0

var last_bonus_at = User.getProperty("last_bonus_at")
var now = new Date()

var can_get_bonus = true
var time_left = 0

if (last_bonus_at) {

  last_bonus_at = new Date(last_bonus_at)

  var next_bonus_time = last_bonus_at.getTime() + cooldown_ms

  if (now.getTime() < next_bonus_time) {
    can_get_bonus = false
    time_left = next_bonus_time - now.getTime()
  }
}

if (can_get_bonus) {

  var new_balance = bal + bonus_amount
  User.setProperty("balance", new_balance, "number")
  User.setProperty("last_bonus_at", now, "datetime")

  Api.sendMessage({
    chat_id: user.telegramid,
    text:
      "✅ *Daily Bonus Claimed!*\n\n" +
      "🎁 +" + bonus_amount + " credits added\n" +
      "💰 *New Balance:* " + new_balance,
    parse_mode: "Markdown"
  })

} else {

  var hours = Math.floor(time_left / (1000 * 60 * 60))
  var minutes = Math.floor((time_left % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = Math.floor((time_left % (1000 * 60)) / 1000)

  Api.sendMessage({
    chat_id: user.telegramid,
    text:
      "⚠️ *Bonus Cooldown Active!*\n\n" +
      "⏳ Try again in:\n*" +
      hours + " HRS " +
      minutes + " MIN " +
      seconds + " SEC*",
    parse_mode: "Markdown"
  })
}
