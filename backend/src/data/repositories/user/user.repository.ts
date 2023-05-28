import {
  CommonKey,
  ProfileInfoKey,
  RoomKey,
  RoomRelationMappings,
  SettingsKey,
  SkillKey,
  StatisticsKey,
  TableName,
  UserKey,
  UserRelationMappings,
  UserToRoomKey,
  UserToRoomRelationMappings,
  UserToSkillKey,
} from 'common/enums/enums';
import { IUserRecord, IUserToSkillRecord } from 'common/interfaces/interfaces';
import {
  Rating,
  RecordWithoutCommonDateKeys,
  RecordWithoutCommonKeys,
  UserAuthInfoResponseDto,
  UserProfileInfoResponseDto,
  Skill,
  TokensResponseDto,
  UserDto,
  UserWithPassword,
  UserToRoom,
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
      .select(
        CommonKey.ID,
        UserKey.EMAIL,
        UserKey.NICKNAME,
        UserKey.PASSWORD,
        UserKey.PHOTO_URL,
      )
      .findOne({ [UserKey.EMAIL]: email.toLowerCase() });
  }

  // move constants to up level
  public async getByEmailWithSettingsAndPersonalRoom(
    email: string,
  ): Promise<
    Omit<UserAuthInfoResponseDto, keyof TokensResponseDto> | undefined
  > {
    const { userToRooms, ...user } =
      (await this._UserModel
        .query()
        .select(...User.DEFAULT_USER_COLUMNS_TO_RETURN)
        .findOne({
          [`${TableName.USERS}.${UserKey.EMAIL}`]: email.toLowerCase(),
        })
        .withGraphJoined(
          // eslint-disable-next-line max-len
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
          // eslint-disable-next-line max-len
          `${UserRelationMappings.USER_TO_ROOMS}.[${UserToRoomRelationMappings.PERSONAL_ROOM}.[${RoomRelationMappings.PARTICIPANTS}]]`,
          (builder) =>
            builder.select(CommonKey.ID, UserKey.NICKNAME, UserKey.PHOTO_URL),
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .castTo<any>()) ?? {};

    if (!userToRooms) {
      return;
    }
    return {
      ...user,
      personalRoom: userToRooms.personalRoom,
    };
  }

  public async getByIdWithSettingsAndPersonalRoom(
    userId: number,
  ): Promise<
    Omit<UserAuthInfoResponseDto, keyof TokensResponseDto> | undefined
  > {
    const { userToRooms, ...user } =
      (await this._UserModel
        .query()
        .select(...User.DEFAULT_USER_COLUMNS_TO_RETURN)
        .findById(userId)
        .withGraphJoined(
          // eslint-disable-next-line max-len
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
          // eslint-disable-next-line max-len
          `${UserRelationMappings.USER_TO_ROOMS}.[${UserToRoomRelationMappings.PERSONAL_ROOM}.[${RoomRelationMappings.PARTICIPANTS}]]`,
          (builder) =>
            builder.select(CommonKey.ID, UserKey.NICKNAME, UserKey.PHOTO_URL),
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .castTo<any>()) ?? {};

    if (!userToRooms) {
      return;
    }
    return {
      ...user,
      personalRoom: userToRooms.personalRoom,
    };
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
    data: Partial<Omit<UserWithPassword, CommonKey.ID>>,
  ): Promise<UserDto> {
    return this._UserModel
      .query()
      .findById(userId)
      .patch(data)
      .returning([
        CommonKey.ID,
        UserKey.EMAIL,
        UserKey.NICKNAME,
        UserKey.PHOTO_URL,
      ])
      .castTo<RecordWithoutCommonDateKeys<IUserRecord>>();
  }

  public async getByIdWithStatistics(
    userId: number,
  ): Promise<
    Omit<UserProfileInfoResponseDto, ProfileInfoKey.RATING> | undefined
  > {
    return this._UserModel
      .query()
      .select(...User.DEFAULT_USER_COLUMNS_TO_RETURN)
      .findById(userId)
      .withGraphJoined(`[${UserRelationMappings.STATISTICS}]`)
      .modifyGraph(UserRelationMappings.STATISTICS, (builder) =>
        builder.select(
          StatisticsKey.AVERAGE_SPEED,
          StatisticsKey.TODAY_AVERAGE_SPEED,
          StatisticsKey.TODAY_LESSONS,
          StatisticsKey.TODAY_TIME,
          StatisticsKey.TODAY_TOP_SPEED,
          StatisticsKey.TOP_SPEED,
          StatisticsKey.TOTAL_LESSONS,
          StatisticsKey.TOTAL_TIME,
        ),
      )
      .castTo<Omit<UserProfileInfoResponseDto, ProfileInfoKey.RATING>>();
  }

  public async getRating(): Promise<Rating> {
    const rating = await this._UserModel
      .query()
      .select(
        `${TableName.USERS}.${CommonKey.ID}`,
        `${TableName.USERS}.${UserKey.NICKNAME}`,
        `${TableName.USERS}.${UserKey.PHOTO_URL}`,
      )
      .withGraphJoined(
        `[${UserRelationMappings.STATISTICS},${UserRelationMappings.SETTINGS}]`,
      )
      .modifyGraph(UserRelationMappings.SETTINGS, (builder) =>
        builder.where(SettingsKey.IS_SHOWN_IN_RATING, true),
      )
      .modifyGraph(UserRelationMappings.STATISTICS, (builder) =>
        builder.select(StatisticsKey.AVERAGE_SPEED),
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .castTo<any[]>();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mappedRating = rating.map(({ statistics, settings, ...user }) => ({
      ...user,
      averageSpeed: statistics.averageSpeed,
    }));

    return mappedRating;
  }

  public async updateCurrentRoomByUserId(
    userId: number,
    roomId: number | null,
  ): Promise<Promise<Omit<UserToRoom, UserToRoomKey.PERSONAL_ROOM_ID>>> {
    return this._UserModel
      .relatedQuery(UserRelationMappings.USER_TO_ROOMS)
      .patch({ roomId })
      .findOne({ userId })
      .returning([UserToRoomKey.USER_ID, UserToRoomKey.CURRENT_ROOM_ID])
      .castTo<Promise<Omit<UserToRoom, UserToRoomKey.PERSONAL_ROOM_ID>>>()
      .execute();
  }

  public async getCurrentSkillLevelsByUserId(
    userId: number,
  ): Promise<Omit<Skill, SkillKey.NAME>[] | undefined> {
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
    payload: Omit<Skill, SkillKey.NAME>[],
  ): Promise<Omit<IUserToSkillRecord, UserToSkillKey.USER_ID>[]> {
    const options = {
      noInsert: true,
      relate: UserRelationMappings.USER_TO_SKILLS,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
