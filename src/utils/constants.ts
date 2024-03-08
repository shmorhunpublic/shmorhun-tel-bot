import { PLATFORM, ROLE } from "./enums";
import { createButtons } from "./helpers/createButtons";

export const CALLBACKS = {
  data: {
    role: { devops: "devops", frontend: "frontend", backend: "backend" },
    platform: {
      djinni: "djinni",
      dou: "dou",
      work: "work",
      robota: "robota",
      glassdoor: "glassdoor",
      indeed: "indeed",
    },
  },
};

export const ROLE_BUTTONS = createButtons([
  { text: ROLE.DEVOPS, callback: CALLBACKS.data.role.devops },
  { text: ROLE.BACKEND, callback: CALLBACKS.data.role.backend },
  { text: ROLE.FRONTEND, callback: CALLBACKS.data.role.frontend },
]);

export const PLATFORM_BUTTONS = createButtons([
  { text: PLATFORM.DJINNI, callback: CALLBACKS.data.platform.djinni },
  { text: PLATFORM.DOU, callback: CALLBACKS.data.platform.dou },
  { text: PLATFORM.WORK, callback: CALLBACKS.data.platform.work },
  { text: PLATFORM.ROBOTA, callback: CALLBACKS.data.platform.robota },
  {
    text: PLATFORM.GLASSDOOR,
    callback: CALLBACKS.data.platform.glassdoor,
  },
  { text: PLATFORM.INDEED, callback: CALLBACKS.data.platform.indeed },
]);
