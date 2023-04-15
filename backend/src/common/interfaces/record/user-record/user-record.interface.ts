import { UserKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/record/common-record/common-record.interface';

interface IUserRecord extends ICommonRecord {
  [UserKey.NICKNAME]: string;
  [UserKey.EMAIL]: string;
  [UserKey.PASSWORD]: string;
  [UserKey.PHOTO_URL]: string | null;
}

export type { IUserRecord };
