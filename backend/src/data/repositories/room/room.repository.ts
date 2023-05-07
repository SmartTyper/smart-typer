import {
  DEFAULT_PERSONAL_ROOM_NAME,
  MAX_USERS_IN_ROOM,
} from 'common/constants/constants';
import { CommonKey, RoomRelationMappings, RoomKey } from 'common/enums/enums';
import { IRoomRecord } from 'common/interfaces/interfaces';
import { RecordWithoutCommonDateKeys, RoomDto } from 'common/types/types';
import { Room as RoomModel } from 'data/models/models';

type Constructor = {
  RoomModel: typeof RoomModel;
};

class Room {
  private _RoomModel: typeof RoomModel;

  public constructor(params: Constructor) {
    this._RoomModel = params.RoomModel;
  }

  public async create(
    data: Pick<IRoomRecord, RoomKey.NAME | RoomKey.IS_PRIVATE>,
  ): Promise<RecordWithoutCommonDateKeys<IRoomRecord>> {
    return this._RoomModel.query().insertAndFetch(data);
  }

  public async createPersonal(): Promise<Pick<IRoomRecord, CommonKey.ID>> {
    return this._RoomModel
      .query()
      .insertAndFetch({ name: DEFAULT_PERSONAL_ROOM_NAME, isPrivate: true })
      .returning(`${CommonKey.ID}`);
  }

  public async getById(roomId: number): Promise<RoomDto | undefined> {
    return this._RoomModel
      .query()
      .findOne({ [CommonKey.ID]: roomId })
      .withGraphJoined(`[${RoomRelationMappings.PARTICIPANTS}]`)
      .returning([
        `${CommonKey.ID}`,
        `${RoomKey.LESSON_ID}`,
        `${RoomKey.NAME}`,
        `${RoomRelationMappings.PARTICIPANTS}`,
      ])
      .castTo<RoomDto>()
      .execute();
  }

  public async getNotPrivateById(roomId: number): Promise<RoomDto | undefined> {
    return this._RoomModel
      .query()
      .findOne({ [CommonKey.ID]: roomId, [RoomKey.IS_PRIVATE]: false })
      .withGraphJoined(`[${RoomRelationMappings.PARTICIPANTS}]`)
      .returning([
        `${CommonKey.ID}`,
        `${RoomKey.LESSON_ID}`,
        `${RoomKey.NAME}`,
        `${RoomRelationMappings.PARTICIPANTS}`,
      ])
      .castTo<RoomDto>()
      .execute();
  }

  public async getAllAvailable(): Promise<RoomDto[]> {
    return this._RoomModel
      .query()
      .where(RoomKey.IS_PRIVATE, false)
      .andWhere(
        this._RoomModel.query().count(`${RoomRelationMappings.PARTICIPANTS}`),
        '<',
        MAX_USERS_IN_ROOM,
      )
      .withGraphJoined(`[${RoomRelationMappings.PARTICIPANTS}]`)
      .returning([
        `${CommonKey.ID}`,
        `${RoomKey.LESSON_ID}`,
        `${RoomKey.NAME}`,
        `${RoomRelationMappings.PARTICIPANTS}`,
      ])
      .castTo<RoomDto[]>()
      .execute();
  }

  public async removeById(roomId: number): Promise<number> {
    return this._RoomModel
      .query()
      .findById(roomId)
      .delete()
      .returning([`${CommonKey.ID}`])
      .castTo<number>();
  }
}
export { Room };
