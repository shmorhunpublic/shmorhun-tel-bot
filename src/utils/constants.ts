export const CALLBACKS = {
  data: {
    start: { index: "/start" },
    role: { devops: "devops", frontend: "frontend", backend: "backend" },
    platform: {
      djinni: "djinni",
      dou: "dou",
      work: "work",
      robota: "robota",
      glassdoor: "glassdoor",
      indeed: "indeed",
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

export const isPlatform = (platform: string): boolean =>
  Object.values(PLATFORM_VALUES).includes(platform);
