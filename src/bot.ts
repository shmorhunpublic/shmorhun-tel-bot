import dotenv from "dotenv";
import TelegramBot, { Message, CallbackQuery } from "node-telegram-bot-api";

import { ROLE } from "./utils/enums";
import { MESSAGES } from "./utils/messages";
import { CALLBACKS } from "./utils/constants";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.log(MESSAGES.errors.env.token);
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg: Message) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [{ text: ROLE.DEVOPS, callback_data: CALLBACKS.data.devops }],
        [{ text: ROLE.BACKEND, callback_data: CALLBACKS.data.backend }],
        [{ text: ROLE.FRONTEND, callback_data: CALLBACKS.data.frontend }],
      ],
    },
  };

  bot.sendMessage(chatId, MESSAGES.choose.role, opts);
});

bot.on("callback_query", (callbackQuery: CallbackQuery) => {
  const message = callbackQuery.message!;
  const data = callbackQuery.data;

  bot.sendMessage(message.chat.id, `${MESSAGES.choose.platform} ${data}`);
});

bot.on("polling_error", (error) => {
  console.log(`${MESSAGES.errors.running.polling} ${error.message}`);
});

bot.on("webhook_error", (error) => {
  console.log(`${MESSAGES.errors.running.webhook} ${error.message}`);
});

console.log(MESSAGES.success.running);
