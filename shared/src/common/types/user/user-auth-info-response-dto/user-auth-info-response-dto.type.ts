import {
  TokensResponseDto,
  SettingsDto,
  RoomDto,
  UserDto,
} from 'common/types/types';

type UserAuthInfoResponseDto = UserDto &
  TokensResponseDto & {
    settings: SettingsDto;
    personalRoom: RoomDto;
  };

export type { UserAuthInfoResponseDto };
