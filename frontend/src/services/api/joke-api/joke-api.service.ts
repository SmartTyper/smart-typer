import { JokeDto } from 'common/types/types';
import { Http as HttpService } from '../../http/http.service';

type Constructor = {
  httpService: HttpService;
};

class JokeApi {
  private _httpService: HttpService;
  private _baseUrl = '/api/jokes';

  public constructor(params: Constructor) {
    this._httpService = params.httpService;
  }

  public async getRandom(): Promise<JokeDto> {
    return this._httpService.load(`${this._baseUrl}/random`);
  }
}

export { JokeApi };
