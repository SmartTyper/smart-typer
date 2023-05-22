import { TEST_LESSON_NAME } from 'common/constants/constants';
import {
  CommonKey,
  ContentType,
  CreatorType,
  LessonKey,
  LessonRelationMappings,
  TableName,
  UserToFinishedLessonKey,
} from 'common/enums/enums';
import { IPaginationResponse } from 'common/interfaces/interfaces';
import {
  CreateLessonRequestDto,
  LessonDto,
  LessonResponseDto,
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
      .findOne({ [CommonKey.ID]: lessonId })
      .returning(Lesson.DEFAULT_LESSON_COLUMNS_TO_RETURN)
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
        `${LessonRelationMappings.FINISHED_LESSON}.${UserToFinishedLessonKey.BEST_SKILL_ID}`,
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
      .withGraphJoined(`[${LessonRelationMappings.FINISHED_LESSON}]`)
      .orderBy(`${TableName.LESSONS}.${CommonKey.ID}`, 'asc')
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

  public async getTestLessonsByUserId(userId: number): Promise<LessonDto[]> {
    return this._LessonModel
      .query()
      .select(
        ...Lesson.DEFAULT_LESSON_COLUMNS_TO_RETURN,
        `${TableName.LESSONS}.${LessonKey.CONTENT_TYPE}`,
        `${TableName.LESSONS}.${LessonKey.CREATOR_TYPE}`,
        `${LessonRelationMappings.FINISHED_LESSON}.${UserToFinishedLessonKey.BEST_SKILL_ID}`,
      )
      .where({
        [LessonKey.NAME]: TEST_LESSON_NAME,
        [UserToFinishedLessonKey.USER_ID]: userId,
      })
      .withGraphJoined(`[${LessonRelationMappings.FINISHED_LESSON}]`)
      .castTo<LessonDto[]>()
      .execute();
  }
}
export { Lesson };
