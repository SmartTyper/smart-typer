import { RoomKey } from '~/common/enums/enums';
import { ICommonRecord } from '~/common/interfaces/records/common-records/common-record.interface';

interface IRoomRecord extends ICommonRecord {
  [RoomKey.LESSON_ID]: number;
  [RoomKey.NAME]: string;
  [RoomKey.IS_PRIVATE]: boolean;
}

export type { IRoomRecord };
