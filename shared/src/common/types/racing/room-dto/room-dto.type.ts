import { UserDto } from 'common/types/types';

type RoomDto = {
  id: number;
  lessonId: number | null;
  name: string;
  participants: Omit<UserDto, 'email'>[];
};

export type { RoomDto };
