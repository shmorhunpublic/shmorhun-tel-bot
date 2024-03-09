import { MESSAGES } from "../utils/messages";

export const errorHandler = (type: "polling" | "webhook") => (error: Error) => {
  console.error(`${MESSAGES.errors.running[type]} ${error.message}`);
};
