import { UserKey } from '~/common/enums/enums';

interface IUserRecord {
  [UserKey.ID]: number;
  [UserKey.NICK_NAME]: string;
  [UserKey.EMAIL]: string;
  [UserKey.PASSWORD]: string;
  [UserKey.PHOTO_URL]: string | null;
  [UserKey.CREATED_AT]: string;
  [UserKey.UPDATED_AT]: string;
}

export type { IUserRecord };
