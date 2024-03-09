import { UserState } from "../types";

const userStates = new Map<number, UserState>();

export const getUserState = (chatId: number): UserState =>
  userStates.get(chatId) || { role: "", level: "", platform: "" };

export const updateUserState = (
  chatId: number,
  newState: Partial<UserState>
): void => {
  const currentState = getUserState(chatId);
  const updatedState = { ...currentState, ...newState };
  userStates.set(chatId, updatedState);
};
