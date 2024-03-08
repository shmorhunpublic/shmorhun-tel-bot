import {
  InlineKeyboardButton,
  InlineKeyboardMarkup,
} from "node-telegram-bot-api";

export function createButtons(buttons: { text: string; callback: string }[]): {
  reply_markup: InlineKeyboardMarkup;
} {
  const inlineKeyboard: InlineKeyboardButton[][] = buttons.map((button) => [
    { text: button.text, callback_data: button.callback },
  ]);

  return {
    reply_markup: {
      inline_keyboard: inlineKeyboard,
    },
  };
}
