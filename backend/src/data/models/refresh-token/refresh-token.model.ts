import { DbTableName, RefreshTokenKey } from '~/common/enums/enums';
import { IRefreshTokenRecord } from '~/common/interfaces/interfaces';

import { Base } from '../base/base.model';

class RefreshToken extends Base implements IRefreshTokenRecord {
  public [RefreshTokenKey.TOKEN]!: IRefreshTokenRecord[RefreshTokenKey.TOKEN];

  public [RefreshTokenKey.USER_ID]!: IRefreshTokenRecord[RefreshTokenKey.USER_ID];

  public static override get tableName(): string {
    return DbTableName.REFRESH_TOKENS;
  }
}

export { RefreshToken };
