import { UserToRoomKey } from '~/common/enums/enums';
import { ICommonRecord } from '~/common/interfaces/records/common-record.interface';

interface IUserToRoomRecord extends ICommonRecord {
  [UserToRoomKey.USER_ID]: number;
  [UserToRoomKey.ROOM_ID]: number;
}

export type { IUserToRoomRecord };
