import { TokensResponseDto } from 'common/types/token/token';
import { SettingsDto } from 'common/types/settings/settings';
import { UserDto } from '../user-dto/user-dto.type';

type UserAuthInfoResponseDto = UserDto &
  TokensResponseDto & {
    settings: SettingsDto;
  };

export type { UserAuthInfoResponseDto };
