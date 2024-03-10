import dotenv from "dotenv";
import TelegramBot, { CallbackQuery } from "node-telegram-bot-api";
// import { callbackQueryHandler } from "./handlers/callback.query.handlers";
import { startHandler } from "./handlers/commands.handlers";
import { errorHandler } from "./handlers/error.handler";
import { MESSAGES } from "./utils/messages";
import { CALLBACKS, isLevel, isPlatform, isRole } from "./utils/constants";
import { ROLE_BUTTONS, PLATFORM_BUTTONS, LEVEL_BUTTONS } from "./utils/buttons";
import { UserState } from "./types";
import { PLATFORM_ROUTES } from "./utils/enums";
import { platformRouter } from "./router/platforms.router";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.log(MESSAGES.errors.env.token);
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const userStates = new Map<number, UserState>();

bot.onText(/\/start/, startHandler(bot));

bot.on("callback_query", async (callbackQuery: CallbackQuery) => {
  const message = callbackQuery.message!;
  const chatId = message.chat.id;
  const data = callbackQuery.data;
  const userState = userStates.get(chatId) || {
    role: "",
    level: "",
    platform: "",
  };
  if (data && userState.role !== data && userState.level !== data) {
    console.log(data, typeof data);

    if (isRole(data)) {
      userState.role = data;
      userStates.set(chatId, userState);
      !userState.level &&
        (await bot.sendMessage(chatId, MESSAGES.choose.level, LEVEL_BUTTONS));
    }

    if (isLevel(data)) {
      userState.level = data;
      userStates.set(chatId, userState);
    }

    if (
      userState.role &&
      userState.level &&
      !isPlatform(data as PLATFORM_ROUTES) &&
      data !== CALLBACKS.data.back.toRoles
    ) {
      await bot.sendMessage(
        chatId,
        MESSAGES.choose.platform(userState.role, userState.level),
        PLATFORM_BUTTONS
      );
    }

    if (
      userState.role &&
      userState.level &&
      isPlatform(data as PLATFORM_ROUTES)
    ) {
      userState.platform = data;
      userStates.set(chatId, userState);

      const parseFunction = platformRouter[userState.platform];
      if (parseFunction) {
        const vacanciesMessage = await parseFunction(
          userState.role,
          userState.level
        );
        if (vacanciesMessage.trim().length > 0) {
          await bot.sendMessage(chatId, vacanciesMessage, {
            parse_mode: "Markdown",
          });
        } else {
          await bot.sendMessage(
            chatId,
            "No vacancies were found matching your request."
          );
        }
      } else {
        await bot.sendMessage(
          chatId,
          "Parsing for this platform is not yet supported."
        );
      }
    }

    if (data === CALLBACKS.data.back.toRoles) {
      userState.role = "";
      userState.level = "";
      userStates.set(chatId, userState);
      await bot.sendMessage(chatId, MESSAGES.choose.role, ROLE_BUTTONS);
      return;
    }
  }
  console.log(userStates);
});

// bot.on("callback_query", callbackQueryHandler(bot));
bot.on("polling_error", errorHandler("polling"));
bot.on("webhook_error", errorHandler("webhook"));

console.log(MESSAGES.success.running);
