import { RefreshTokenKey } from '~/common/enums/enums';

interface IRefreshTokenRecord {
  [RefreshTokenKey.ID]: number;
  [RefreshTokenKey.USER_ID]: number;
  [RefreshTokenKey.TOKEN]: string;
  [RefreshTokenKey.CREATED_AT]: string;
  [RefreshTokenKey.UPDATED_AT]: string;
}

export type { IRefreshTokenRecord };
