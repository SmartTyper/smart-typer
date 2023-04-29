import { HttpMethod } from 'common/enums/enums';
import { SettingsDto } from 'common/types/types';
import { http as httpService } from 'services/services';

type Constructor = {
  httpService: typeof httpService;
};

class SettingsApi {
  private _httpService = httpService;
  private _baseUrl = '/api/settings';

  public constructor(params: Constructor) {
    this._httpService = params.httpService;
  }

  public async update(payload: Partial<SettingsDto>): Promise<void> {
    return this._httpService.load(this._baseUrl, {
      method: HttpMethod.PUT,
      payload: JSON.stringify(payload),
    });
  }
}

export { SettingsApi };
