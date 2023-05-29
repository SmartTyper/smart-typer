import { CommonKey, RoomKey } from 'common/enums/enums';
import { RoomDto } from 'common/types/types';

type CreateRoomResponseDto = Pick<
  RoomDto,
  CommonKey.ID | RoomKey.LESSON_ID | RoomKey.NAME
>;

export type { CreateRoomResponseDto };
