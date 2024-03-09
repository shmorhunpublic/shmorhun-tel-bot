import { PlatformRouter } from "../types";
import { PLATFORM_ROUTES } from "../utils/enums";
import { searchDou } from "../utils/requests/dou";

export const platformRouter: PlatformRouter = {
  [PLATFORM_ROUTES.DOU]: searchDou,
  [PLATFORM_ROUTES.DJINNI]: null,
  [PLATFORM_ROUTES.WORK]: null,
  [PLATFORM_ROUTES.ROBOTA]: null,
  [PLATFORM_ROUTES.GLASSDOOR]: null,
  [PLATFORM_ROUTES.INDEED]: null,
};
