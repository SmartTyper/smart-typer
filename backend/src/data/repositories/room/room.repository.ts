import {
  DEFAULT_PERSONAL_ROOM_NAME,
  MAX_USERS_IN_ROOM,
  NO_USERS_IN_ROOM,
} from 'common/constants/constants';
import { NO_ROOM_OWNER } from 'common/constants/racing/no-room-owner/no-room-owner.constant';
import {
  CommonKey,
  RoomRelationMappings,
  RoomKey,
  UserToRoomKey,
  TableName,
  UserKey,
} from 'common/enums/enums';
import { IRoomRecord, IUserToRoomRecord } from 'common/interfaces/interfaces';
import {
  CreateRoomResponseDto,
  ParticipantsCount,
  RoomDto,
} from 'common/types/types';
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
  ): Promise<CreateRoomResponseDto> {
    const { id, lessonId, name } = await this._RoomModel
      .query()
      .insertAndFetch(data);

    return { id, lessonId, name };
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

  public async getById(
    roomId: RoomDto[CommonKey.ID],
  ): Promise<RoomDto | undefined> {
    return this._RoomModel
      .query()
      .select(
        `${TableName.ROOMS}.${CommonKey.ID}`,
        `${TableName.ROOMS}.${RoomKey.LESSON_ID}`,
        `${TableName.ROOMS}.${RoomKey.NAME}`,
      )
      .findOne(`${TableName.ROOMS}.${CommonKey.ID}`, roomId)
      .withGraphJoined(`[${RoomRelationMappings.PARTICIPANTS}]`)
      .modifyGraph(RoomRelationMappings.PARTICIPANTS, (builder) =>
        builder.select(CommonKey.ID, UserKey.NICKNAME, UserKey.PHOTO_URL),
      )
      .castTo<RoomDto>();
  }

  public async getParticipantsCountById(
    roomId: RoomDto[CommonKey.ID],
  ): Promise<ParticipantsCount & Pick<RoomDto, CommonKey.ID>> {
    return this._RoomModel
      .query()
      .select([
        `${TableName.ROOMS}.${CommonKey.ID}`,
        this._RoomModel
          .query()
          .count('*')
          .innerJoinRelated(RoomRelationMappings.USER_TO_CURRENT_ROOM)
          .where(`${TableName.ROOMS}.${CommonKey.ID}`, roomId)
          .as('count'),
      ])
      .where(`${TableName.ROOMS}.${CommonKey.ID}`, roomId)
      .first()
      .castTo<ParticipantsCount & Pick<RoomDto, CommonKey.ID>>();
  }

  public async getOwnerIdByPersonalRoomId(
    roomId: RoomDto[CommonKey.ID],
  ): Promise<Pick<IUserToRoomRecord, UserToRoomKey.USER_ID> | undefined> {
    return this._RoomModel
      .query()
      .select(
        `${RoomRelationMappings.USER_TO_PERSONAL_ROOM}.${UserToRoomKey.USER_ID}`,
      )
      .findOne(`${TableName.ROOMS}.${CommonKey.ID}`, roomId)
      .innerJoinRelated(RoomRelationMappings.USER_TO_PERSONAL_ROOM)
      .castTo<Pick<IUserToRoomRecord, UserToRoomKey.USER_ID> | undefined>();
  }

  public async getAllAvailable(): Promise<RoomDto[]> {
    return this._RoomModel
      .query()
      .select(
        `${TableName.ROOMS}.${CommonKey.ID}`,
        `${TableName.ROOMS}.${RoomKey.LESSON_ID}`,
        `${TableName.ROOMS}.${RoomKey.NAME}`,
      )
      .where(RoomKey.IS_PRIVATE, false)
      .andWhere(
        this._RoomModel.knex().raw(`(
          select count(*) from ${TableName.USERS_TO_ROOMS}
          where ${TableName.USERS_TO_ROOMS}.current_room_id =
          ${TableName.ROOMS}.${CommonKey.ID}) < ${MAX_USERS_IN_ROOM}`),
      )
      .withGraphJoined(`[${RoomRelationMappings.PARTICIPANTS}]`)
      .modifyGraph(RoomRelationMappings.PARTICIPANTS, (builder) =>
        builder.select(CommonKey.ID, UserKey.NICKNAME, UserKey.PHOTO_URL),
      )
      .castTo<RoomDto[]>();
  }

  public async removeById(
    roomId: RoomDto[CommonKey.ID],
  ): Promise<RoomDto[CommonKey.ID]> {
    return this._RoomModel
      .query()
      .findById(roomId)
      .delete()
      .returning([`${CommonKey.ID}`])
      .castTo<RoomDto[CommonKey.ID]>();
  }

  public async deleteCreatedBeforeTodayWithoutParticipants(): Promise<void> {
    await this._RoomModel
      .query()
      .delete()
      .where(
        this._RoomModel.knex().raw(`(
          SELECT count(*)
          FROM ${TableName.USERS_TO_ROOMS}
          WHERE ${TableName.USERS_TO_ROOMS}.current_room_id =
          ${TableName.ROOMS}.${CommonKey.ID}) = ${NO_USERS_IN_ROOM}
          AND ${TableName.ROOMS}.${CommonKey.CREATED_AT}::date < CURRENT_DATE`),
      )
      .andWhere(
        this._RoomModel.knex().raw(`(
          SELECT count(*)
          FROM ${TableName.USERS_TO_ROOMS}
          WHERE ${TableName.USERS_TO_ROOMS}.personal_room_id =
          ${TableName.ROOMS}.${CommonKey.ID}) = ${NO_ROOM_OWNER}`),
      );
  }
}

export { Room };
