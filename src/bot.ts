import * as dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import { Message, CallbackQuery } from "node-telegram-bot-api";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.log("Bot token is not specified in .env file");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg: Message) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "DevOps 🛠", callback_data: "devops" }],
        [{ text: "Backend 💻", callback_data: "backend" }],
        [{ text: "Frontend 🖌", callback_data: "frontend" }],
      ],
    },
  };

  bot.sendMessage(chatId, "Please choose a job category:", opts);
});

bot.on("callback_query", (callbackQuery: CallbackQuery) => {
  const message = callbackQuery.message!;
  const data = callbackQuery.data;

  bot.sendMessage(message.chat.id, `Selected option: ${data}`);
});
