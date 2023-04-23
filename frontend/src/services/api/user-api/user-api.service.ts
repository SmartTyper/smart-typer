import { HttpMethod } from 'common/enums/enums';
import { IUserWithTokens } from 'common/interfaces/interfaces';
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

  public async getFullInfo(userId?: number): Promise<IUserWithTokens> {
    return this._httpService.load(this._baseUrl, {
      method: HttpMethod.GET,
      queryParams: { userId },
    });
  }
}

export { UserApi };
