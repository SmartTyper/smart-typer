import { UserKey } from '~/common/enums/enums';
import { ICommonRecord } from '~/common/interfaces/records/common-records/common-record.interface';

interface IUserRecord extends ICommonRecord {
  [UserKey.NICK_NAME]: string;
  [UserKey.EMAIL]: string;
  [UserKey.PASSWORD]: string;
  [UserKey.PHOTO_URL]: string | null;
}

export type { IUserRecord };
