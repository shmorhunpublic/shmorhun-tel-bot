import dotenv from "dotenv";
import TelegramBot, { Message, CallbackQuery } from "node-telegram-bot-api";

import { MESSAGES } from "./utils/messages";
import { CALLBACKS, isLevel, isPlatform, isRole } from "./utils/constants";
import { ROLE_BUTTONS, PLATFORM_BUTTONS } from "./utils/buttons";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.log(MESSAGES.errors.env.token);
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const userStates = new Map();

bot.onText(/\/start/, (msg: Message) => {
  const chatId = msg.chat.id;
  const opts = ROLE_BUTTONS;

  userStates.set(chatId, { role: "", level: "", platform: "" });
  bot.sendMessage(chatId, MESSAGES.choose.role, opts);
});

bot.on("callback_query", async (callbackQuery: CallbackQuery) => {
  const message = callbackQuery.message!;
  const chatId = message.chat.id;
  const data = callbackQuery.data;
  const userState = userStates.get(chatId) || {
    role: "",
    level: "",
    platform: "",
  };
  if (data) {
    if (isRole(data)) {
      userState.role = data;
      userStates.set(chatId, userState);
    }

    if (isLevel(data)) {
      userState.level = data;
      userStates.set(chatId, userState);
    }

    if (
      userState.role &&
      userState.level &&
      !isPlatform(data) &&
      data !== CALLBACKS.data.back.toRoles
    ) {
      const opts = PLATFORM_BUTTONS;
      await bot.sendMessage(chatId, MESSAGES.choose.platform, opts);
    }

    if (isPlatform(data)) {
      userState.platform = data;
      userStates.set(chatId, userState);

      await bot.sendMessage(
        chatId,
        `Role: ${userState.role}, Level: ${userState.level}, Platform: ${userState.platform}`
      );
    }

    if (data === CALLBACKS.data.back.toRoles) {
      userState.role = "";
      userState.level = "";
      userStates.set(chatId, userState);
      const opts = ROLE_BUTTONS;
      await bot.sendMessage(chatId, MESSAGES.choose.role, opts);
      return;
    }
  }
  console.log(userStates);
});

bot.on("polling_error", (error) => {
  console.log(`${MESSAGES.errors.running.polling} ${error.message}`);
});

bot.on("webhook_error", (error) => {
  console.log(`${MESSAGES.errors.running.webhook} ${error.message}`);
});

console.log(MESSAGES.success.running);
