import TelegramBot, { CallbackQuery } from "node-telegram-bot-api";
import { ROLE_BUTTONS, PLATFORM_BUTTONS } from "../utils/buttons";
import { MESSAGES } from "../utils/messages";
import { CALLBACKS, isLevel, isPlatform, isRole } from "../utils/constants";
import { updateUserState, getUserState } from "../utils/state.manager";

export const callbackQueryHandler =
  (bot: TelegramBot) => async (callbackQuery: CallbackQuery) => {
    const message = callbackQuery.message!;
    const chatId = message.chat.id;
    const data = callbackQuery.data;
    let userState = getUserState(chatId);

    if (data === CALLBACKS.data.back.toRoles) {
      updateUserState(chatId, { role: "", level: "", platform: "" });
      await bot.sendMessage(chatId, MESSAGES.choose.role, ROLE_BUTTONS);
      return;
    }

    if (data) {
      if (isRole(data)) {
        updateUserState(chatId, {
          ...userState,
          role: data,
          platform: "",
        });
        // Предлагаем выбрать уровень после выбора роли
        // Здесь должна быть логика для LEVEL_BUTTONS, аналогично ROLE_BUTTONS
        // await bot.sendMessage(chatId, MESSAGES.choose.level, LEVEL_BUTTONS);
      }

      if (isLevel(data)) {
        updateUserState(chatId, { ...userState, level: data });
      }

      if (
        userState.role &&
        userState.level
        // !isPlatform(data) &&
        // data !== CALLBACKS.data.back.toRoles
      ) {
        await bot.sendMessage(
          chatId,
          MESSAGES.choose.platform,
          PLATFORM_BUTTONS
        );
      }

      if (isPlatform(data)) {
        updateUserState(chatId, { ...userState, platform: data });
        await bot.sendMessage(
          chatId,
          `Role: ${userState.role}, Level: ${userState.level}, Platform: ${userState.platform}`
        );
      }

      if (data === CALLBACKS.data.back.toRoles) {
        updateUserState(chatId, { role: "", level: "", platform: "" });
        await bot.sendMessage(chatId, MESSAGES.choose.role, ROLE_BUTTONS);
        return;
      }
    }
    console.log(getUserState(chatId));
  };
