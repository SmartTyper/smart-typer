import { HttpMethod, RequestContentType } from 'common/enums/enums';
import { SettingsDto } from 'common/types/types';
import { Http as HttpService } from '../../http/http.service';

type Constructor = {
  httpService: HttpService;
};

class SettingsApi {
  private _httpService: HttpService;
  private _baseUrl = '/api/settings';

  public constructor(params: Constructor) {
    this._httpService = params.httpService;
  }

  public async update(payload: Partial<SettingsDto>): Promise<void> {
    return this._httpService.load(this._baseUrl, {
      method: HttpMethod.PUT,
      payload: JSON.stringify(payload),
      contentType: RequestContentType.JSON,
    });
  }
}

export { SettingsApi };
