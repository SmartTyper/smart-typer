import { CommonKey } from 'common/enums/enums';
import { RoomDto } from 'common/types/types';

type RoomIdDto = {
  roomId: RoomDto[CommonKey.ID];
};

export type { RoomIdDto };
