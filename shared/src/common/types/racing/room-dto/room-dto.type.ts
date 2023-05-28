import { UserKey } from 'common/enums/enums';
import { UserDto } from 'common/types/types';

type RoomDto = {
  id: number;
  lessonId: number | null;
  name: string;
  participants: Omit<UserDto, UserKey.EMAIL>[];
};

export type { RoomDto };
