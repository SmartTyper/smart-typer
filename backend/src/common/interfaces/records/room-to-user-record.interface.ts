import { RoomToUserKey } from '~/common/enums/enums';

interface IRoomToUserRecord {
  [RoomToUserKey.ID]: number;
  [RoomToUserKey.USER_ID]: number;
  [RoomToUserKey.ROOM_ID]: number;
  [RoomToUserKey.CREATED_AT]: string;
  [RoomToUserKey.UPDATED_AT]: string;
}

export type { IRoomToUserRecord };
