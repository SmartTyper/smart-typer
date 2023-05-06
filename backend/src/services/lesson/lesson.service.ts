import { ContentType } from 'common/enums/enums';
import { IPaginationResponse } from 'common/interfaces/interfaces';
import {
  LessonDto,
  LessonResponseDto,
  CreateLessonRequestDto,
  SkillsStatisticsDto,
} from 'common/types/types';
import { lesson as lessonRepository } from 'data/repositories/repositories';

type Constructor = {
  lessonRepository: typeof lessonRepository;
};

class Lesson {
  private _lessonRepository: typeof lessonRepository;

  public constructor(params: Constructor) {
    this._lessonRepository = params.lessonRepository;
  }

  public async getById(lessonId: number): Promise<LessonResponseDto> {
    return {} as LessonResponseDto;
  }

  public async create(
    payload: CreateLessonRequestDto,
  ): Promise<LessonResponseDto> {
    return {} as LessonResponseDto;
  }

  public async getMore(
    offset: number,
    limit: number,
    contentType?: ContentType,
    creatorType?: CreatorType,
  ): Promise<IPaginationResponse<LessonDto>> {
    return {} as IPaginationResponse<LessonDto>;
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
