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
    // if(allTestLesson are finished){
    //   show study plan without test lessons
    // }
    // else{
    //   show only test lessons
    // }
    return {} as LessonDto[];
  }

  public async handleLessonResult(
    lessonId: number,
    payload: SkillsStatisticsDto,
  ): Promise<void> {
    // map to skills, if test - call IRT, else call BKT, than call AHP
    // skillsRepository
    // statisticsRepository
    // ITSService
    return;
  }
}

export { Lesson };
