import { TEST_LESSON_NAMES } from 'common/constants/constants';
import {
  CommonKey,
  ContentType,
  CreatorType,
  LessonKey,
  LessonRelationMappings,
  LessonToSkillKey,
  RecordsSortOrder,
  SkillKey,
  TableName,
  UserToFinishedLessonKey,
  UserToFinishedLessonRelationMapping,
  UserToStudyPlanLessonKey,
} from 'common/enums/enums';
import {
  ILessonRecord,
  IPaginationResponse,
  IUserToStudyPlanLessonRecord,
} from 'common/interfaces/interfaces';
import {
  CreateLessonRequestDto,
  FinishedLesson,
  LessonDto,
  LessonResponseDto,
  LessonWithSkills,
  Statistics,
  UserDto,
} from 'common/types/types';
import { Lesson as LessonModel } from 'data/models/models';

type Constructor = {
  LessonModel: typeof LessonModel;
};

class Lesson {
  private _LessonModel: typeof LessonModel;

  public constructor(params: Constructor) {
    this._LessonModel = params.LessonModel;
  }

  private static DEFAULT_LESSON_COLUMNS_TO_RETURN: string[] = [
    `${TableName.LESSONS}.${CommonKey.ID}`,
    `${TableName.LESSONS}.${LessonKey.CONTENT}`,
    `${TableName.LESSONS}.${LessonKey.NAME}`,
  ];

  public async getById(
    lessonId: number,
  ): Promise<LessonResponseDto | undefined> {
    return this._LessonModel
      .query()
      .select(...Lesson.DEFAULT_LESSON_COLUMNS_TO_RETURN)
      .findOne({ [CommonKey.ID]: lessonId })
      .execute();
  }

  public async getByIdWithSkills(
    lessonId: number,
  ): Promise<LessonWithSkills | undefined> {
    return this._LessonModel
      .query()
      .select(
        ...Lesson.DEFAULT_LESSON_COLUMNS_TO_RETURN,
        `${LessonRelationMappings.SKILLS}.${CommonKey.ID}`,
        `${LessonRelationMappings.SKILLS}.${SkillKey.NAME}`,
        `${LessonRelationMappings.LESSON_TO_SKILLS}.${LessonToSkillKey.COUNT}`,
      )
      .findOne({ [CommonKey.ID]: lessonId })
      .withGraphJoined(
        `[${LessonRelationMappings.SKILLS}, ${LessonRelationMappings.LESSON_TO_SKILLS}]`,
      )
      .castTo<LessonWithSkills>()
      .execute();
  }

  public async create(
    userId: UserDto[CommonKey.ID],
    data: CreateLessonRequestDto,
  ): Promise<LessonResponseDto> {
    const { id, name, content } = await this._LessonModel
      .query()
      .insert({
        ...data,
        creatorId: userId,
      })
      .returning(Lesson.DEFAULT_LESSON_COLUMNS_TO_RETURN);

    const lesson = {
      id,
      name,
      content,
    };

    const contentReplaced = data.content.replace(/'/g, '"');

    await this._LessonModel.knex().raw(`
      WITH skill_count AS (
        SELECT ${lesson.id} AS lesson_id, skills.id AS skill_id, COUNT(matches)
        FROM skills,
        LATERAL regexp_matches('${contentReplaced}', skills.name, 'gi') AS matches
        GROUP BY skills.id
      )
      INSERT INTO lessons_to_skills (lesson_id, skill_id, count)
      SELECT * FROM skill_count
      WHERE count > 0;
    `);

    return lesson;
  }

  public async getLessons(
    userId: number,
    offset: number,
    limit: number,
    contentType?: ContentType,
    creatorType?: CreatorType,
  ): Promise<IPaginationResponse<LessonDto>> {
    const lessons = await this._LessonModel
      .query()
      .select(
        ...Lesson.DEFAULT_LESSON_COLUMNS_TO_RETURN,
        LessonKey.CREATOR_ID,
        LessonKey.CONTENT_TYPE,
      )
      .where((builder) => {
        if (contentType) {
          builder.where({ contentType });
        }
      })
      .andWhere((builder) => {
        if (creatorType) {
          builder.where({ creatorType });
        }
      })
      .withGraphJoined(
        `[${LessonRelationMappings.FINISHED_LESSON}.[${UserToFinishedLessonRelationMapping.SKILL}]]`,
      )
      .modifyGraph(LessonRelationMappings.FINISHED_LESSON, (builder) =>
        builder.findOne({ userId }),
      )
      .modifyGraph(
        `${LessonRelationMappings.FINISHED_LESSON}.[${UserToFinishedLessonRelationMapping.SKILL}]`,
        (builder) => builder.select(SkillKey.NAME),
      )
      .orderBy(`${TableName.LESSONS}.${CommonKey.ID}`, RecordsSortOrder.ASC)
      .offset(offset)
      .limit(limit)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .castTo<any[]>();

    const mappedLessons = lessons.map(
      ({ creatorId: _creatorId, finishedLesson, ...lesson }) => {
        const creatorType =
          userId === lesson.creatorId
            ? CreatorType.CURRENT_USER
            : lesson.creatorId
              ? CreatorType.OTHER_USERS
              : CreatorType.SYSTEM;

        return {
          ...lesson,
          creatorType,
          bestSkill: finishedLesson?.pop()?.skill?.name ?? null,
        };
      },
    );

    const count = await this._LessonModel.query().resultSize();

    return {
      data: mappedLessons,
      count,
    };
  }

  public getTestIds(): Promise<
    Pick<IUserToStudyPlanLessonRecord, UserToStudyPlanLessonKey.LESSON_ID>[]
  > {
    return this._LessonModel
      .query()
      .select(`${CommonKey.ID} as ${UserToStudyPlanLessonKey.LESSON_ID}`)
      .whereIn(LessonKey.NAME, TEST_LESSON_NAMES)
      .castTo<
        Pick<IUserToStudyPlanLessonRecord, UserToStudyPlanLessonKey.LESSON_ID>[]
      >()
      .execute();
  }

  public async getStudyPlanByUserId(
    userId: number,
    areTestLessons = false,
  ): Promise<LessonDto[]> {
    const lessons = await this._LessonModel
      .query()
      .select(
        ...Lesson.DEFAULT_LESSON_COLUMNS_TO_RETURN,
        `${TableName.LESSONS}.${LessonKey.CONTENT_TYPE}`,
        `${TableName.LESSONS}.${LessonKey.CREATOR_ID}`,
        `${LessonRelationMappings.BEST_SKILL}.${SkillKey.NAME}`,
      )
      .where({
        [`${LessonRelationMappings.STUDY_PLAN}.${UserToStudyPlanLessonKey.USER_ID}`]:
          userId,
      })
      .andWhere((builder) => {
        if (areTestLessons) {
          builder.whereIn(LessonKey.NAME, TEST_LESSON_NAMES);
        } else {
          builder.whereNotIn(LessonKey.NAME, TEST_LESSON_NAMES);
        }
      })
      .withGraphJoined(
        [
          `${LessonRelationMappings.STUDY_PLAN}`,
          `${LessonRelationMappings.BEST_SKILL}`,
        ].join(),
      )
      .orderBy(
        `${LessonRelationMappings.STUDY_PLAN}.${UserToStudyPlanLessonKey.PRIORITY}`,
        RecordsSortOrder.ASC,
      )
      .castTo<
        (Omit<LessonDto, LessonKey.CREATOR_TYPE> &
          Pick<ILessonRecord, LessonKey.CREATOR_ID>)[]
      >()
      .execute();

    const mappedLessons = lessons.map((lesson) => {
      const creatorType =
        userId === lesson.creatorId
          ? CreatorType.CURRENT_USER
          : lesson.creatorId
            ? CreatorType.OTHER_USERS
            : CreatorType.SYSTEM;

      return { ...lesson, creatorType };
    });

    return mappedLessons;
  }

  public async getAverageSpeed(
    userId: number,
  ): Promise<Pick<Statistics, 'averageSpeed' | 'todayAverageSpeed'>> {
    const today = new Date().setHours(0, 0, 0, 0);
    return this._LessonModel
      .query()
      .select([
        this._LessonModel
          .query()
          .where({
            [`${LessonRelationMappings.FINISHED_LESSON}.${UserToFinishedLessonKey.USER_ID}`]:
              userId,
          })
          .withGraphJoined(`[${LessonRelationMappings.FINISHED_LESSON}]`)
          .avg(
            `${LessonRelationMappings.FINISHED_LESSON}.${UserToFinishedLessonKey.AVERAGE_SPEED}`,
          )
          .as('averageSpeed'),

        this._LessonModel
          .query()
          .where({ userId })
          .andWhere(CommonKey.UPDATED_AT, '=', today)
          .withGraphJoined(`[${LessonRelationMappings.FINISHED_LESSON}]`)
          .avg(
            `${LessonRelationMappings.FINISHED_LESSON}.${UserToFinishedLessonKey.AVERAGE_SPEED}`,
          )
          .as('todayAverageSpeed'),
      ])
      .first()
      .castTo<Pick<Statistics, 'averageSpeed' | 'todayAverageSpeed'>>();
  }

  public insertNewStudyPlanLesson(
    userId: number,
    lessonId: number,
  ): Promise<ILessonRecord> {
    return this._LessonModel
      .relatedQuery(LessonRelationMappings.STUDY_PLAN)
      .for(lessonId)
      .insert(userId)
      .castTo<ILessonRecord>()
      .execute();
  }

  public insertFinishedLesson(
    lessonId: number,
    payload: FinishedLesson,
  ): Promise<ILessonRecord> {
    return this._LessonModel
      .relatedQuery(LessonRelationMappings.FINISHED_LESSON)
      .for(lessonId)
      .insert(payload)
      .castTo<ILessonRecord>()
      .execute();
  }

  public async getAllSystemWithSkills(): Promise<
    Omit<LessonWithSkills, 'content' | 'name'>[]
  > {
    return this._LessonModel
      .query()
      .select(
        `${TableName.LESSONS}.${CommonKey.ID}`,

        `${LessonRelationMappings.SKILLS}.${CommonKey.ID}`,
        `${LessonRelationMappings.SKILLS}.${SkillKey.NAME}`,
        `${LessonRelationMappings.LESSON_TO_SKILLS}.${LessonToSkillKey.COUNT}`,
      )
      .whereNull(LessonKey.CREATOR_ID)
      .withGraphJoined(
        `[${LessonRelationMappings.SKILLS}, ${LessonRelationMappings.LESSON_TO_SKILLS}]`,
      )
      .castTo<LessonWithSkills[]>()
      .execute();
  }

  public async getLastNFinishedIds(
    userId: number,
    n: number,
  ): Promise<Pick<LessonDto, 'id'>[]> {
    return this._LessonModel
      .query()
      .select(CommonKey.ID)
      .where({ userId })
      .withGraphJoined(`[${LessonRelationMappings.FINISHED_LESSON}]`)
      .orderBy(
        `${LessonRelationMappings.FINISHED_LESSON}.${CommonKey.CREATED_AT}`,
        RecordsSortOrder.DESC,
      )
      .limit(n);
  }
}
export { Lesson };
