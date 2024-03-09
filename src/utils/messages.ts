export const MESSAGES = {
  choose: {
    role: "Please choose a developer role:",
    level: "Please choose a experience level:",
    platform: (role: string, level: string) =>
      `Please choose platform for ${level} ${role} role`,
  },
  back: { toRoles: "Back to roles" },
  success: {
    running: "Bot is successfully running...",
  },
  errors: {
    env: {
      token: "Bot token is not specified in .env file",
    },
    running: {
      webhook: "Bot is not running due to webhook error:",
      polling: "Bot is not running due to polling error:",
    },
  },
};
