import { PLATFORM_ROUTES } from "./enums";

export const CALLBACKS = {
  data: {
    start: { index: "/start" },
    role: { devops: "devops", frontend: "frontend", backend: "backend" },
    platform: {
      djinni: PLATFORM_ROUTES.DJINNI,
      dou: PLATFORM_ROUTES.DOU,
      work: PLATFORM_ROUTES.WORK,
      robota: PLATFORM_ROUTES.ROBOTA,
      glassdoor: PLATFORM_ROUTES.GLASSDOOR,
      indeed: PLATFORM_ROUTES.INDEED,
    },
    back: {
      toRoles: "backToRoles",
    },
    level: {
      junior: "junior",
      middle: "middle",
      senior: "senior",
    },
  },
};

export const ROLE_VALUES = CALLBACKS.data.role;
export const LEVEL_VALUES = CALLBACKS.data.level;
export const PLATFORM_VALUES = CALLBACKS.data.platform;

export const isRole = (role: string): boolean =>
  Object.values(ROLE_VALUES).includes(role);

export const isLevel = (level: string): boolean =>
  Object.values(LEVEL_VALUES).includes(level);

export const isPlatform = (platform: PLATFORM_ROUTES): boolean =>
  Object.values(PLATFORM_VALUES).includes(platform);
