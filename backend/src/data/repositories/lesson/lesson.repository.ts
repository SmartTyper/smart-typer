import { TEST_LESSON_NAMES } from 'common/constants/constants';
import {
  CommonKey,
  ContentType,
  CreatorType,
  LessonKey,
  LessonRelationMappings,
  RecordsSortOrder,
  SkillKey,
  TableName,
  UserToFinishedLessonKey,
  UserToStudyPlanLessonKey,
} from 'common/enums/enums';
import { IPaginationResponse } from 'common/interfaces/interfaces';
import {
  CreateLessonRequestDto,
  LessonDto,
  LessonResponseDto,
  LessonWithSkillNames,
  Statistics,
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
  ): Promise<LessonWithSkillNames | undefined> {
    return this._LessonModel
      .query()
      .select(
        ...Lesson.DEFAULT_LESSON_COLUMNS_TO_RETURN,
        `${LessonRelationMappings.SKILLS}.${SkillKey.NAME}`,
      )
      .findOne({ [CommonKey.ID]: lessonId })
      .withGraphJoined(`[${LessonRelationMappings.SKILLS}]`)
      .castTo<LessonWithSkillNames>()
      .execute();
  }

  public async create(
    data: CreateLessonRequestDto,
  ): Promise<LessonResponseDto> {
    return this._LessonModel
      .query()
      .insert(data)
      .returning(Lesson.DEFAULT_LESSON_COLUMNS_TO_RETURN)
      .execute();
  }

  public async getLessons(
    offset: number,
    limit: number,
    contentType?: ContentType,
    creatorType?: CreatorType,
  ): Promise<IPaginationResponse<LessonDto>> {
    const lessons = await this._LessonModel
      .query()
      .select(
        ...Lesson.DEFAULT_LESSON_COLUMNS_TO_RETURN,
        `${TableName.LESSONS}.${LessonKey.CONTENT_TYPE}`,
        `${TableName.LESSONS}.${LessonKey.CREATOR_TYPE}`,
        `${LessonRelationMappings.BEST_SKILL}.${SkillKey.NAME}`,
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
      .withGraphJoined(`[${LessonRelationMappings.BEST_SKILL}]`)
      .orderBy(`${TableName.LESSONS}.${CommonKey.ID}`, RecordsSortOrder.ASC)
      .offset(offset)
      .limit(limit)
      .castTo<LessonDto[]>()
      .execute();

    const count = await this._LessonModel.query().resultSize();

    return {
      data: lessons,
      count,
    };
  }

  public async getStudyPlanByUserId(
    userId: number,
    areTestLessons = false,
  ): Promise<LessonDto[]> {
    return this._LessonModel
      .query()
      .select(
        ...Lesson.DEFAULT_LESSON_COLUMNS_TO_RETURN,
        `${TableName.LESSONS}.${LessonKey.CONTENT_TYPE}`,
        `${TableName.LESSONS}.${LessonKey.CREATOR_TYPE}`,
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
      )
      .castTo<LessonDto[]>()
      .execute();
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

  public insertNewStudyPlanLesson(userId: number, lessonId: number) {
    return this._LessonModel
      .relatedQuery(LessonRelationMappings.STUDY_PLAN)
      .for(lessonId)
      .insert(userId);
  }
}
export { Lesson };
