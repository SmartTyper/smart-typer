import { HttpMethod } from 'common/enums/enums';
import {
  User,
  UserIdDto,
  UserWithStatisticsAndRatingResponseDto,
  UserWithTokensAndSettingsResponseDto,
  updateAvatarResponseDto,
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

  public async updateInfo(payload: Partial<User>): Promise<void> {
    return this._httpService.load(`${this._baseUrl}/current`, {
      method: HttpMethod.PUT,
      payload: JSON.stringify(payload),
    });
  }

  public async updateAvatar(file: File): Promise<updateAvatarResponseDto> {
    const fd = new FormData();
    fd.append('image', file, file.name);

    return this._httpService.load(`${this._baseUrl}/current/avatar`, {
      method: HttpMethod.PUT,
      payload: fd,
    });
  }

  public async deleteAvatar(): Promise<void> {
    return this._httpService.load(`${this._baseUrl}/current/avatar`, {
      method: HttpMethod.DELETE,
    });
  }
}

export { UserApi };
