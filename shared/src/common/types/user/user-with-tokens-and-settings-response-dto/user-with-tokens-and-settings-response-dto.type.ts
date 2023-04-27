import { UserWithSettings } from '../user-with-settings/user-with-settings.type';

type UserWithTokensAndSettingsResponseDto = UserWithSettings & {
  accessToken: string;
  refreshToken: string;
};

export type { UserWithTokensAndSettingsResponseDto };
