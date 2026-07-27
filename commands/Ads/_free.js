/*CMD
  command: /free
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Ads

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Earn4link API TOKEN (REPLACE WITH NEW ONE)
var API_TOKEN = "2cecde37dce05fc8231a7aaab9be752ef97f6c3c";

// generate random param
var rand = Math.floor(Math.random() * 1000000);
var accessParam = "ad_" + user.telegramid + "_" + rand;

// save param as valid (not yet used)
User.setProperty("pending_param", accessParam, "string");

// destination deep link
var deepLink = "https://t.me/SosUnlimitedbot?start=" + accessParam;

// build Earn4link API url (TEXT response)
var apiUrl =
  "https://earn4link.in/api" +
  "?api=" + API_TOKEN +
  "&url=" + encodeURIComponent(deepLink) +
  "&format=text";

// call API
HTTP.get({
  url: apiUrl,
  success: "/onShortLink",
  error: "/onError"
});

