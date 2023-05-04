import { ContentType } from 'common/enums/enums';
import { IPaginationResponse } from 'common/interfaces/interfaces';
import { LessonDto, LessonWithSkillsDto } from 'common/types/types';
import { lesson as lessonRepository } from 'data/repositories/repositories';

type Constructor = {
  lessonRepository: typeof lessonRepository;
};

class Lesson {
  private _lessonRepository: typeof lessonRepository;

  public constructor(params: Constructor) {
    this._lessonRepository = params.lessonRepository;
  }

  public async getById(lessonId: number): Promise<LessonWithSkillsDto> {
    return {} as LessonWithSkillsDto;
  }

  public async create(
    payload: CreateLessonRequestDto,
  ): Promise<LessonWithSkillsDto> {
    return {} as LessonWithSkillsDto;
  }

  public async getMore(
    offset: number,
    limit: number,
    contentType?: ContentType,
    creatorType?: CreatorType,
  ): Promise<IPaginationResponse<LessonDto>> {
    return {} as IPaginationResponse<LessonDto>;
  }
}

export { Lesson };
