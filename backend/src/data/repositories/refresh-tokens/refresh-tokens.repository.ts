import { RefreshToken as RefreshTokenModel } from 'data/models/models';
import { IRefreshTokenRecord } from 'common/interfaces/interfaces';
import { RecordWithoutCommonKeys } from 'common/types/types';
import { RefreshTokenKey } from 'common/enums/enums';

const create = async (
  data: RecordWithoutCommonKeys<IRefreshTokenRecord>,
): Promise<IRefreshTokenRecord> => {
  return RefreshTokenModel.query().insert(data);
};

const getByToken = async (
  token: string,
): Promise<IRefreshTokenRecord | undefined> => {
  return RefreshTokenModel.query().findOne({ [RefreshTokenKey.TOKEN]: token });
};

const removeByUserId = async (userId: number): Promise<number> => {
  return RefreshTokenModel.query()
    .where({ [RefreshTokenKey.USER_ID]: userId })
    .delete();
};

export { create, getByToken, removeByUserId };
