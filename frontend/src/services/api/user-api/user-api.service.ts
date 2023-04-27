import {
  UserIdDto,
  UserWithStatisticsAndRatingResponseDto,
  UserWithTokensAndSettingsResponseDto,
} from 'common/types/types';
import { http as httpService } from 'services/services';

type Constructor = {
  httpService: typeof httpService;
};

class UserApi {
  private _httpService = httpService;
  private _baseUrl = '/api/user';

  public constructor(params: Constructor) {
    this._httpService = params.httpService;
  }

  public async getWithTokensAndSettings(): Promise<UserWithTokensAndSettingsResponseDto> {
    return this._httpService.load(`${this._baseUrl}/current`);
  }

  public async getWithStatisticsAndRating(
    userId: UserIdDto,
  ): Promise<UserWithStatisticsAndRatingResponseDto> {
    return this._httpService.load(`${this._baseUrl}/${userId}`);
  }
}

export { UserApi };
