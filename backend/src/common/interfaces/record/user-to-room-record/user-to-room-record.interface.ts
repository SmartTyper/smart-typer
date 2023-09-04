import { UserToRoomKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/interfaces';

interface IUserToRoomRecord extends ICommonRecord {
  [UserToRoomKey.USER_ID]: number;
  [UserToRoomKey.CURRENT_ROOM_ID]: number | null;
  [UserToRoomKey.PERSONAL_ROOM_ID]: number;
}

export type { IUserToRoomRecord };
