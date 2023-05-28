import {
  DEFAULT_PERSONAL_ROOM_NAME,
  MAX_USERS_IN_ROOM,
} from 'common/constants/constants';
import {
  CommonKey,
  RoomRelationMappings,
  RoomKey,
  UserToRoomKey,
  GameRoomKey,
} from 'common/enums/enums';
import { IRoomRecord, IUserToRoomRecord } from 'common/interfaces/interfaces';
import { ParticipantsCount, RoomDto } from 'common/types/types';
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
  ): Promise<Omit<RoomDto, GameRoomKey.PARTICIPANTS>> {
    return this._RoomModel
      .query()
      .insertAndFetch(data)
      .castTo<Promise<Omit<RoomDto, GameRoomKey.PARTICIPANTS>>>();
  }

  public async createPersonal(): Promise<
    Pick<IUserToRoomRecord, UserToRoomKey.PERSONAL_ROOM_ID>
  > {
    const { personalRoomId } = await this._RoomModel
      .query()
      .insert({
        name: DEFAULT_PERSONAL_ROOM_NAME,
        isPrivate: true,
      })
      .returning(`${CommonKey.ID} as ${UserToRoomKey.PERSONAL_ROOM_ID}`)
      .castTo<Pick<IUserToRoomRecord, UserToRoomKey.PERSONAL_ROOM_ID>>();

    return { personalRoomId };
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

  public async getParticipantsCountById(
    roomId: number,
  ): Promise<ParticipantsCount> {
    return this._RoomModel
      .query()
      .count('*')
      .where(CommonKey.ID, roomId)
      .andWhereNot({
        [`${RoomRelationMappings.USER_TO_CURRENT_ROOM}.${UserToRoomKey.USER_ID}`]:
          null,
      })
      .withGraphJoined(`[${RoomRelationMappings.USER_TO_CURRENT_ROOM}]`)
      .castTo<ParticipantsCount>();
  }

  public async getOwnerIdByPersonalRoomId(
    roomId: number,
  ): Promise<{ [UserToRoomKey.USER_ID]: number | null }> {
    return this._RoomModel
      .query()
      .select(
        `${RoomRelationMappings.USER_TO_PERSONAL_ROOM}.${UserToRoomKey.USER_ID}`,
      )
      .where(CommonKey.ID, roomId)
      .withGraphJoined(`[${RoomRelationMappings.USER_TO_PERSONAL_ROOM}]`)
      .castTo<{ [UserToRoomKey.USER_ID]: number | null }>();
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
