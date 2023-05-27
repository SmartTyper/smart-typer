import { RefreshTokenKey } from 'common/enums/enums';
import { IRefreshTokenRecord } from 'common/interfaces/interfaces';
import { RecordWithoutCommonKeys } from 'common/types/types';
import { RefreshToken as RefreshTokenModel } from 'data/models/models';

type Constructor = {
  RefreshTokenModel: typeof RefreshTokenModel;
};

class RefreshToken {
  private _RefreshTokenModel: typeof RefreshTokenModel;

  public constructor(params: Constructor) {
    this._RefreshTokenModel = params.RefreshTokenModel;
  }

  public async upsert(
    data: RecordWithoutCommonKeys<IRefreshTokenRecord>,
  ): Promise<IRefreshTokenRecord> {
    return this._RefreshTokenModel
      .query()
      .insert(data)
      .onConflict(RefreshTokenKey.USER_ID)
      .merge();
  }

  public async getByToken(
    token: string,
  ): Promise<IRefreshTokenRecord | undefined> {
    return this._RefreshTokenModel.query().findOne({
      [RefreshTokenKey.TOKEN]: token,
    });
  }

  public async removeByUserId(userId: number): Promise<number> {
    return this._RefreshTokenModel.query().where({ userId }).delete();
  }
}
export { RefreshToken };
