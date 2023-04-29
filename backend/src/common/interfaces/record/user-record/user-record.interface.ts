import { UserKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/interfaces';

interface IUserRecord extends ICommonRecord {
  [UserKey.NICKNAME]: string;
  [UserKey.EMAIL]: string;
  [UserKey.PASSWORD]: string | null;
  [UserKey.PHOTO_URL]: string | null;
}

export type { IUserRecord };
