import { UserKey, UserRelationMappings } from 'common/enums/enums';
import { IUserRecord } from 'common/interfaces/interfaces';
import { RecordWithoutCommonKeys } from 'common/types/types';
import { User as UserModel } from 'data/models/models';
import {
  skill as skillRepository,
  room as roomRepository,
} from 'data/repositories/repositories';

type Constructor = {
  UserModel: typeof UserModel;
  skillRepository: typeof skillRepository;
  roomRepository: typeof roomRepository;
};

class User {
  private _UserModel: typeof UserModel;
  private _skillRepository: typeof skillRepository;
  private _roomRepository: typeof roomRepository;

  public constructor(params: Constructor) {
    this._UserModel = params.UserModel;
    this._skillRepository = params.skillRepository;
    this._roomRepository = params.roomRepository;
  }

  public async create(
    data: RecordWithoutCommonKeys<IUserRecord>,
  ): Promise<IUserRecord> {
    const user = await this._UserModel.query().insert({
      ...data,
      [UserKey.EMAIL]: data.email.toLowerCase(),
    });

    await this._UserModel
      .relatedQuery(UserRelationMappings.SKILLS)
      .for(user.id)
      .relate(this._skillRepository.getAllIds());

    await this._UserModel
      .relatedQuery(UserRelationMappings.SETTINGS)
      .for(user.id)
      .insert();

    await this._UserModel
      .relatedQuery(UserRelationMappings.STATISTICS)
      .for(user.id)
      .insert();

    await this._UserModel
      .relatedQuery(UserRelationMappings.STATISTICS)
      .for(user.id)
      .relate(this._roomRepository.createPersonal());

    return user;
  }

  public async getByEmail(email: string): Promise<IUserRecord | undefined> {
    return this._UserModel
      .query()
      .findOne({ [UserKey.EMAIL]: email.toLowerCase() });
  }

  public async getById(userId: number): Promise<IUserRecord | undefined> {
    return this._UserModel.query().findById(userId);
  }

  public async patchById(
    userId: number,
    data: Partial<IUserRecord>,
  ): Promise<IUserRecord> {
    return this._UserModel.query().patchAndFetchById(userId, data);
  }
}

export { User };
