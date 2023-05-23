import { TEST_LESSON_NAMES } from 'common/constants/constants';
import {
  ContentType,
  CreatorType,
  HttpCode,
  HttpErrorMessage,
} from 'common/enums/enums';
import { IPaginationResponse } from 'common/interfaces/interfaces';
import {
  LessonDto,
  LessonResponseDto,
  CreateLessonRequestDto,
  SkillsStatisticsDto,
} from 'common/types/types';
import { lesson as lessonRepository } from 'data/repositories/repositories';
import { HttpError } from 'exceptions/exceptions';

type Constructor = {
  lessonRepository: typeof lessonRepository;
};

class Lesson {
  private _lessonRepository: typeof lessonRepository;

  public constructor(params: Constructor) {
    this._lessonRepository = params.lessonRepository;
  }

  public async getById(lessonId: number): Promise<LessonResponseDto> {
    const lesson = await this._lessonRepository.getById(lessonId);

    if (!lesson) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_LESSON_WITH_SUCH_ID,
      });
    }
    return lesson;
  }

  public async create(
    payload: CreateLessonRequestDto,
  ): Promise<LessonResponseDto> {
    return this._lessonRepository.create(payload);
  }

  public async getMore(
    offset: number,
    limit: number,
    contentType?: ContentType,
    creatorType?: CreatorType,
  ): Promise<IPaginationResponse<LessonDto>> {
    return this._lessonRepository.getLessons(
      offset,
      limit,
      contentType,
      creatorType,
    );
  }

  public async getStudyPlan(userId: number): Promise<LessonDto[]> {
    const testLessons = await this._lessonRepository.getTestLessonsByUserId(
      userId,
    );
    const passedTestLessons = testLessons.filter(
      (testLesson) => testLesson.bestSkill,
    );
    if (passedTestLessons.length === TEST_LESSON_NAMES.length) {
      // show study plan without test lessons
      // get lessons with offset 3
      // getStudyPlanWithoutTestLessons()
    } else {
      return testLessons;
    }
  }

  public async handleLessonResult(
    lessonId: number,
    payload: SkillsStatisticsDto,
  ): Promise<void> {
    // map to skills, if test - call IRT, else call BKT, than call AHP
    // getLessonWithSkillsById

    // skillsRepository
    // statisticsRepository
    // finishedLessonRepository
    // ITSService
    // StudyPlanRepository
    console.log(lessonId, payload);
    return;
  }
}

export { Lesson };
