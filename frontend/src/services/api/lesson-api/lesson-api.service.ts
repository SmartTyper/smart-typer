import { HttpMethod } from 'common/enums/enums';
import { Http as HttpService } from '../../http/http.service';
import {
  CreateLessonRequestDto,
  LessonDto,
  LessonFilters,
  LessonIdDto,
  LessonWithSkillsDto,
} from 'common/types/types';
import {
  IPaginationRequest,
  IPaginationResponse,
} from 'common/interface/interface';

type Constructor = {
  httpService: HttpService;
};

class LessonApi {
  private _httpService: HttpService;
  private _baseUrl = '/api/lessons';

  public constructor(params: Constructor) {
    this._httpService = params.httpService;
  }

  public async create(
    payload: CreateLessonRequestDto,
  ): Promise<LessonWithSkillsDto> {
    return this._httpService.load(this._baseUrl, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
    });
  }

  public async get(payload: LessonIdDto): Promise<LessonWithSkillsDto> {
    const { lessonId } = payload;
    return this._httpService.load(`${this._baseUrl}/${lessonId}`);
  }

  public async getMore(
    payload: IPaginationRequest & LessonFilters,
  ): Promise<IPaginationResponse<LessonDto>> {
    return this._httpService.load(this._baseUrl, {
      method: HttpMethod.GET,
      queryParams: payload,
    });
  }
}

export { LessonApi };
