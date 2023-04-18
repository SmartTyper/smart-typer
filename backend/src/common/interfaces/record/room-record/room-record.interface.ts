import { RoomKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/record/common-record/common-record.interface';

interface IRoomRecord extends ICommonRecord {
  [RoomKey.LESSON_ID]: number | null;
  [RoomKey.NAME]: string;
  [RoomKey.IS_PRIVATE]: boolean;
}

export type { IRoomRecord };
