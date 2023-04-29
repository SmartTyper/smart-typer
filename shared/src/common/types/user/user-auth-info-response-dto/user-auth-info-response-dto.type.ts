import { TokensResponseDto } from 'common/types/token/token';
import { SettingsDto } from 'common/types/settings/settings';
import { RoomDto } from 'common/types/types';
import { UserDto } from '../user-dto/user-dto.type';

type UserAuthInfoResponseDto = UserDto &
  TokensResponseDto & {
    settings: SettingsDto;
    personalRoom: RoomDto;
  };

export type { UserAuthInfoResponseDto };
