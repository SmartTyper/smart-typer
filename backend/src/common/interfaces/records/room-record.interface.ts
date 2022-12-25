import { RoomKey } from '~/common/enums/enums';

interface IRoomRecord {
  [RoomKey.ID]: number;
  [RoomKey.LESSON_ID]: number;
  [RoomKey.NAME]: string;
  [RoomKey.IS_PRIVATE]: boolean;
  [RoomKey.CREATED_AT]: string;
  [RoomKey.UPDATED_AT]: string;
}

export type { IRoomRecord };
