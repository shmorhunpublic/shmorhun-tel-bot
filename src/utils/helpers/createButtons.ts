import {
  InlineKeyboardButton,
  InlineKeyboardMarkup,
} from "node-telegram-bot-api";
import { ButtonDataType } from "../../types";

export function createButtons(buttons: ButtonDataType): {
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

export function createButtonsRows(buttonRows: ButtonDataType[]): {
  reply_markup: InlineKeyboardMarkup;
} {
  const inlineKeyboard: InlineKeyboardButton[][] = buttonRows.map((row) =>
    row.map((button) => ({
      text: button.text,
      callback_data: button.callback,
    }))
  );

  return {
    reply_markup: {
      inline_keyboard: inlineKeyboard,
    },
  };
}

export function createButtonsColumns(buttons: ButtonDataType[]): {
  reply_markup: InlineKeyboardMarkup;
} {
  const inlineKeyboard: InlineKeyboardButton[][] = [];

  const maxColumnLength = Math.max(...buttons.map((column) => column.length));

  for (let rowIndex = 0; rowIndex < maxColumnLength; rowIndex++) {
    const row: InlineKeyboardButton[] = [];
    for (let columnIndex = 0; columnIndex < buttons.length; columnIndex++) {
      const button = buttons[columnIndex][rowIndex];
      if (button) {
        row.push({
          text: button.text,
          callback_data: button.callback,
        });
      }
    }
    if (row.length > 0) {
      inlineKeyboard.push(row);
    }
  }

  return {
    reply_markup: {
      inline_keyboard: inlineKeyboard,
    },
  };
}
