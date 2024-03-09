import { CALLBACKS } from "./constants";
import { BUTTONS, ROLE, LEVEL, PLATFORM } from "./enums";
import { createButtons, createButtonsRows } from "./helpers/createButtons";
import { MESSAGES } from "./messages";

const BUTTONS_PARAMS = {
  start: [{ text: BUTTONS.START, callback: CALLBACKS.data.start.index }],
  role: [
    { text: ROLE.DEVOPS, callback: CALLBACKS.data.role.devops },
    { text: ROLE.BACKEND, callback: CALLBACKS.data.role.backend },
    { text: ROLE.FRONTEND, callback: CALLBACKS.data.role.frontend },
  ],
  level: [
    { text: LEVEL.JUNIOR, callback: CALLBACKS.data.level.junior },
    { text: LEVEL.MIDDLE, callback: CALLBACKS.data.level.middle },
    { text: LEVEL.SENIOR, callback: CALLBACKS.data.level.senior },
  ],
  platform: [
    { text: PLATFORM.DJINNI, callback: CALLBACKS.data.platform.djinni },
    { text: PLATFORM.DOU, callback: CALLBACKS.data.platform.dou },
    { text: PLATFORM.WORK, callback: CALLBACKS.data.platform.work },
    { text: PLATFORM.ROBOTA, callback: CALLBACKS.data.platform.robota },
    {
      text: PLATFORM.GLASSDOOR,
      callback: CALLBACKS.data.platform.glassdoor,
    },
    { text: PLATFORM.INDEED, callback: CALLBACKS.data.platform.indeed },
    { text: MESSAGES.back.toRoles, callback: CALLBACKS.data.back.toRoles },
  ],
};

export const START_BUTTON = createButtons(BUTTONS_PARAMS.start);

export const ROLE_BUTTONS = createButtonsRows([
  BUTTONS_PARAMS.role,
  BUTTONS_PARAMS.level,
]);

export const PLATFORM_BUTTONS = createButtons(BUTTONS_PARAMS.platform);
