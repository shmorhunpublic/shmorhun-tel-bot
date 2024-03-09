import TelegramBot, { Message } from "node-telegram-bot-api";
import { ROLE_BUTTONS } from "../utils/buttons";
import { MESSAGES } from "../utils/messages";
import { updateUserState } from "../utils/state.manager";

export const startHandler = (bot: TelegramBot) => (msg: Message) => {
  const chatId = msg.chat.id;
  const opts = ROLE_BUTTONS;

  updateUserState(chatId, { role: "", level: "", platform: "" });
  bot.sendMessage(chatId, MESSAGES.choose.role, opts);
};
