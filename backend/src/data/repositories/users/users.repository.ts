import { UserKey } from 'common/enums/enums';
import { IUserRecord } from 'common/interfaces/interfaces';
import { RecordWithoutCommonKeys } from 'common/types/types';
import { User as UserModel } from 'data/models/models';

const create = async (
  data: RecordWithoutCommonKeys<IUserRecord>,
): Promise<IUserRecord> => {
  return UserModel.query().insert({
    ...data,
    [UserKey.EMAIL]: data.email.toLowerCase(),
  });
};

const getByEmail = async (email: string): Promise<IUserRecord | undefined> => {
  return UserModel.query().findOne({ [UserKey.EMAIL]: email.toLowerCase() });
};

const getById = async (userId: number): Promise<IUserRecord | undefined> => {
  return UserModel.query().findById(userId);
};

const patchById = async (
  userId: number,
  data: Partial<IUserRecord>,
): Promise<IUserRecord> => {
  return UserModel.query().patchAndFetchById(userId, data);
};

export { create, getByEmail, getById, patchById };
