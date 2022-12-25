import { RefreshTokenKey } from '~/common/enums/enums';
import { ICommonRecord } from '~/common/interfaces/records/common-records/common-record.interface';

interface IRefreshTokenRecord extends ICommonRecord {
  [RefreshTokenKey.USER_ID]: number;
  [RefreshTokenKey.TOKEN]: string;
}

export type { IRefreshTokenRecord };
