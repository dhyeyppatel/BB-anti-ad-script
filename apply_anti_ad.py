import os
import re

# Paths
BOT_DIR = r"D:\Project\Api\Bots-Business-Anti-Ad\sos bot"
COMMANDS_DIR = os.path.join(BOT_DIR, "commands")
ANTI_AD_DIR = os.path.join(COMMANDS_DIR, "AntiAd")

# 1. Create AntiAd Directory
os.makedirs(ANTI_AD_DIR, exist_ok=True)

# 2. Write Core BJS Scripts
bjs_save_last = """if (!options || !options.result) { return; }

let messageId = options.result.message_id;
Bot.setProperty("lastBotMessageId_" + chat.chatid, messageId, "integer");
"""

bjs_cleanup_cron = """let lastBotMsgId = Bot.getProperty("lastBotMessageId_" + chat.chatid);
if (!lastBotMsgId) { return; }

Api.sendMessage({
    chat_id: chat.chatid,
    text: ".", 
    on_result: "/onCheckerDelivered"
});
"""

bjs_on_checker = """if (!options || !options.result) { return; }

let checkerMsgId = options.result.message_id;
let lastBotMsgId = Bot.getProperty("lastBotMessageId_" + chat.chatid);

if (lastBotMsgId) {
    let gap = checkerMsgId - lastBotMsgId;
    if (gap > 1) {
        for (let i = lastBotMsgId + 1; i < checkerMsgId; i++) {
            Api.deleteMessage({ chat_id: chat.chatid, message_id: i });
        }
    }
}

Api.deleteMessage({ chat_id: chat.chatid, message_id: checkerMsgId });

Bot.run({
    command: "/cleanupCron",
    run_after: 600,
    chat_id: chat.chatid
});
"""

with open(os.path.join(ANTI_AD_DIR, "_saveLastBotMessage.js"), "w", encoding="utf-8") as f:
    f.write(bjs_save_last)

with open(os.path.join(ANTI_AD_DIR, "_cleanupCron.js"), "w", encoding="utf-8") as f:
    f.write(bjs_cleanup_cron)

with open(os.path.join(ANTI_AD_DIR, "_onCheckerDelivered.js"), "w", encoding="utf-8") as f:
    f.write(bjs_on_checker)

# 3. Refactor all files
for root, dirs, files in os.walk(COMMANDS_DIR):
    for file in files:
        if file.endswith(".js"):
            filepath = os.path.join(root, file)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()

            original_content = content

            # Handle existing on_result target (afterSend)
            if file == "afterSend.js":
                if "Bot.runCommand(\"/saveLastBotMessage\"" not in content:
                    content = 'Bot.runCommand("/saveLastBotMessage", options);\n' + content

            # Replace Bot.sendMessage("...") with Api.sendMessage({ ... })
            def bot_send_message_replacer(match):
                text_arg = match.group(1)
                return f'Api.sendMessage({{\n  chat_id: chat.chatid,\n  text: {text_arg},\n  on_result: "/saveLastBotMessage"\n}})'
            
            # Matches Bot.sendMessage(...) where inside is not a dictionary and doesn't contain a comma
            content = re.sub(r'Bot\.sendMessage\(\s*([^,{}]+)\s*\)', bot_send_message_replacer, content)

            # Replace Api.sendMessage({ to inject on_result at the top
            content = re.sub(r'Api\.sendMessage\(\s*\{', r'Api.sendMessage({\n  on_result: "/saveLastBotMessage",', content)
            
            # Replace Api.sendPhoto({ to inject on_result at the top
            content = re.sub(r'Api\.sendPhoto\(\s*\{', r'Api.sendPhoto({\n  on_result: "/saveLastBotMessage",', content)

            if content != original_content:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"Refactored: {filepath}")

print("Refactoring complete.")
