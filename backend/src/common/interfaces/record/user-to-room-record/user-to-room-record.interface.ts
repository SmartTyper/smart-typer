import { UserToRoomKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/record/common-record/common-record.interface';

interface IUserToRoomRecord extends ICommonRecord {
  [UserToRoomKey.USER_ID]: number;
  [UserToRoomKey.ROOM_ID]: number;
}

export type { IUserToRoomRecord };
