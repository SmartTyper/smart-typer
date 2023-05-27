import {
  CommonKey,
  RoomKey,
  RoomRelationMappings,
  SettingsKey,
  StatisticsKey,
  TableName,
  UserKey,
  UserRelationMappings,
  UserToRoomKey,
  UserToRoomRelationMappings,
  UserToSkillKey,
} from 'common/enums/enums';
import {
  IUserRecord,
  IUserToRoomRecord,
  IUserToSkillRecord,
} from 'common/interfaces/interfaces';
import {
  Rating,
  RecordWithoutCommonDateKeys,
  RecordWithoutCommonKeys,
  UserAuthInfoResponseDto,
  UserProfileInfoResponseDto,
  Skill,
  TokensResponseDto,
} from 'common/types/types';
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

  private static DEFAULT_USER_COLUMNS_TO_RETURN: string[] = [
    `${TableName.USERS}.${CommonKey.ID}`,
    `${TableName.USERS}.${UserKey.NICKNAME}`,
    `${TableName.USERS}.${UserKey.EMAIL}`,
    `${TableName.USERS}.${UserKey.PHOTO_URL}`,
  ];

  public async create(
    data: RecordWithoutCommonKeys<IUserRecord>,
  ): Promise<RecordWithoutCommonDateKeys<IUserRecord>> {
    const user = await this._UserModel
      .query()
      .insert({
        ...data,
        [UserKey.EMAIL]: data.email.toLowerCase(),
      })
      .returning([
        CommonKey.ID,
        UserKey.EMAIL,
        UserKey.NICKNAME,
        UserKey.PASSWORD,
        UserKey.PHOTO_URL,
      ]);

    await this._UserModel
      .relatedQuery(UserRelationMappings.USER_TO_SKILLS)
      .for(user.id)
      .insert(await this._skillRepository.getAllIds());

    await this._UserModel
      .relatedQuery(UserRelationMappings.SETTINGS)
      .for(user.id)
      .insert({});

    await this._UserModel
      .relatedQuery(UserRelationMappings.STATISTICS)
      .for(user.id)
      .insert({});

    await this._UserModel
      .relatedQuery(UserRelationMappings.USER_TO_ROOMS)
      .for(user.id)
      .insert(await this._roomRepository.createPersonal());

    //user-to-study-plan create records with test lessons

    return user;
  }

  public async getByEmail(
    email: string,
  ): Promise<RecordWithoutCommonDateKeys<IUserRecord> | undefined> {
    return this._UserModel
      .query()
      .findOne({ [UserKey.EMAIL]: email.toLowerCase() })
      .returning([
        CommonKey.ID,
        UserKey.EMAIL,
        UserKey.NICKNAME,
        UserKey.PASSWORD,
        UserKey.PHOTO_URL,
      ]);
  }
  // move constants to up level
  public async getByEmailWithSettingsAndPersonalRoom(
    email: string,
  ): Promise<
    Omit<UserAuthInfoResponseDto, keyof TokensResponseDto> | undefined
  > {
    const { userToRooms, ...user } = await this._UserModel
      .query()
      .select(...User.DEFAULT_USER_COLUMNS_TO_RETURN)
      .findOne({
        [`${TableName.USERS}.${UserKey.EMAIL}`]: email.toLowerCase(),
      })
      .withGraphJoined(
        `[${UserRelationMappings.SETTINGS}, ${UserRelationMappings.USER_TO_ROOMS}.[${UserToRoomRelationMappings.PERSONAL_ROOM}.[${RoomRelationMappings.PARTICIPANTS}]]]`,
      )
      .modifyGraph(UserRelationMappings.SETTINGS, (builder) =>
        builder.select(
          SettingsKey.COUNTDOWN_BEFORE_GAME,
          SettingsKey.GAME_TIME,
          SettingsKey.HAS_EMAIL_NOTIFICATIONS,
          SettingsKey.IS_SHOWN_IN_RATING,
          SettingsKey.IS_SOUND_TURNED_ON,
        ),
      )
      .modifyGraph(
        `${UserRelationMappings.USER_TO_ROOMS}.[${UserToRoomRelationMappings.PERSONAL_ROOM}]`,
        (builder) =>
          builder.select(CommonKey.ID, RoomKey.LESSON_ID, RoomKey.NAME),
      )
      .modifyGraph(
        `${UserRelationMappings.USER_TO_ROOMS}.[${UserToRoomRelationMappings.PERSONAL_ROOM}.[${RoomRelationMappings.PARTICIPANTS}]]`,
        (builder) =>
          builder.select(CommonKey.ID, UserKey.NICKNAME, UserKey.PHOTO_URL),
      )
      .castTo<any>();

    return {
      ...user,
      personalRoom: userToRooms.personalRoom,
    };
  }

  public async getByIdWithSettingsAndPersonalRoom(
    userId: number,
  ): Promise<
    | (RecordWithoutCommonDateKeys<IUserRecord> &
        Pick<UserAuthInfoResponseDto, 'personalRoom' | 'settings'>)
    | undefined
  > {
    return this._UserModel
      .query()
      .select(
        ...User.DEFAULT_USER_COLUMNS_TO_RETURN,

        `${UserRelationMappings.SETTINGS}.${SettingsKey.COUNTDOWN_BEFORE_GAME}`,
        `${UserRelationMappings.SETTINGS}.${SettingsKey.GAME_TIME}`,
        `${UserRelationMappings.SETTINGS}.${SettingsKey.HAS_EMAIL_NOTIFICATIONS}`,
        `${UserRelationMappings.SETTINGS}.${SettingsKey.IS_SHOWN_IN_RATING}`,
        `${UserRelationMappings.SETTINGS}.${SettingsKey.IS_SOUND_TURNED_ON}`,

        `${UserRelationMappings.PERSONAL_ROOM}.${CommonKey.ID}`,
        `${UserRelationMappings.PERSONAL_ROOM}.${RoomKey.LESSON_ID}`,
        `${UserRelationMappings.PERSONAL_ROOM}.${RoomKey.NAME}`,

        `${UserRelationMappings.PERSONAL_ROOM}.${RoomRelationMappings.PARTICIPANTS}.*`,
      )
      .findById(userId)
      .withGraphJoined(
        [
          `${UserRelationMappings.SETTINGS}`,
          `${UserRelationMappings.PERSONAL_ROOM}.[${RoomRelationMappings.PARTICIPANTS}]`,
        ].join(),
      )
      .castTo<
        IUserRecord & Pick<UserAuthInfoResponseDto, 'personalRoom' | 'settings'>
      >()
      .execute();
  }

  public async getById(
    userId: number,
  ): Promise<RecordWithoutCommonDateKeys<IUserRecord> | undefined> {
    return this._UserModel
      .query()
      .findById(userId)
      .returning([
        CommonKey.ID,
        UserKey.EMAIL,
        UserKey.NICKNAME,
        UserKey.PASSWORD,
        UserKey.PHOTO_URL,
      ]);
  }

  public async patchById(
    userId: number,
    data: Partial<IUserRecord>,
  ): Promise<RecordWithoutCommonDateKeys<IUserRecord>> {
    return this._UserModel
      .query()
      .patchAndFetchById(userId, data)
      .returning([
        CommonKey.ID,
        UserKey.EMAIL,
        UserKey.NICKNAME,
        UserKey.PASSWORD,
        UserKey.PHOTO_URL,
      ]);
  }

  public async getByIdWithStatistics(
    userId: number,
  ): Promise<
    RecordWithoutCommonDateKeys<IUserRecord> &
      Pick<UserProfileInfoResponseDto, 'statistics'>
  > {
    return this._UserModel
      .query()
      .select(
        ...User.DEFAULT_USER_COLUMNS_TO_RETURN,

        `${UserRelationMappings.STATISTICS}.${StatisticsKey.AVERAGE_SPEED}`,
        `${UserRelationMappings.STATISTICS}.${StatisticsKey.TODAY_AVERAGE_SPEED}`,
        `${UserRelationMappings.STATISTICS}.${StatisticsKey.TODAY_LESSONS}`,
        `${UserRelationMappings.STATISTICS}.${StatisticsKey.TODAY_TIME}`,
        `${UserRelationMappings.STATISTICS}.${StatisticsKey.TODAY_TOP_SPEED}`,
        `${UserRelationMappings.STATISTICS}.${StatisticsKey.TOP_SPEED}`,
        `${UserRelationMappings.STATISTICS}.${StatisticsKey.TOTAL_LESSONS}`,
        `${UserRelationMappings.STATISTICS}.${StatisticsKey.TOTAL_TIME}`,
      )
      .findById(userId)
      .withGraphJoined(`[${UserRelationMappings.STATISTICS}]`)
      .castTo<IUserRecord & Pick<UserProfileInfoResponseDto, 'statistics'>>()
      .execute();
  }

  public async getRating(): Promise<Rating> {
    return this._UserModel
      .query()
      .select(
        `${TableName.USERS}.${CommonKey.ID}`,
        `${TableName.USERS}.${UserKey.NICKNAME}`,
        `${TableName.USERS}.${UserKey.PHOTO_URL}`,

        `${UserRelationMappings.STATISTICS}.${StatisticsKey.AVERAGE_SPEED}`,
      )
      .withGraphJoined(
        [
          `${UserRelationMappings.STATISTICS}`,
          `${UserRelationMappings.SETTINGS}`,
        ].join(),
      )
      .where(
        `${UserRelationMappings.SETTINGS}.${SettingsKey.IS_SHOWN_IN_RATING}`,
        true,
      )
      .castTo<Rating>()
      .execute();
  }

  public async updateCurrentRoomByUserId(
    userId: number,
    roomId: number | null,
  ): Promise<
    Pick<
      IUserToRoomRecord,
      UserToRoomKey.USER_ID | UserToRoomKey.CURRENT_ROOM_ID
    >
  > {
    return this._UserModel
      .relatedQuery(UserRelationMappings.USER_TO_ROOMS)
      .patch({ roomId })
      .findOne({ userId })
      .returning([UserToRoomKey.USER_ID, UserToRoomKey.CURRENT_ROOM_ID])
      .castTo<
        Pick<
          IUserToRoomRecord,
          UserToRoomKey.USER_ID | UserToRoomKey.CURRENT_ROOM_ID
        >
      >()
      .execute();
  }

  public async getCurrentSkillLevelsByUserId(
    userId: number,
  ): Promise<Omit<Skill, 'name'>[] | undefined> {
    return this._UserModel
      .query()
      .select(
        `${TableName.USERS_TO_SKILLS}.${UserToSkillKey.LEVEL}`,
        `${TableName.USERS_TO_SKILLS}.${UserToSkillKey.SKILL_ID} as ${CommonKey.ID}`,
      )
      .findById(userId)
      .withGraphJoined(`[${UserRelationMappings.USER_TO_SKILLS}]`)
      .castTo<Skill[]>();
  }

  public async patchSkillLevelsByUserId(
    userId: number,
    payload: Omit<Skill, 'name'>[],
  ): Promise<Omit<IUserToSkillRecord, 'userId'>[]> {
    const options = {
      noInsert: true,
      relate: UserRelationMappings.USER_TO_SKILLS,
    };
    // @ts-ignore
    return this._UserModel
      .query()
      .upsertGraphAndFetch(
        {
          id: userId,
          [UserRelationMappings.USER_TO_SKILLS]: payload,
        },
        options,
      )
      .returning([UserToSkillKey.SKILL_ID, UserToSkillKey.LEVEL]);
  }
}

export { User };
