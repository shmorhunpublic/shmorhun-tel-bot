export type ButtonDataType = { text: string; callback: string }[];

export type UserState = {
  role?: string;
  level?: string;
  platform?: string;
};

type ParseFunction = (role: string, level: string) => Promise<string>;

export interface PlatformRouter {
  [key: string]: ParseFunction | null;
}
