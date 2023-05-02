import {
  axios as axiosService,
  logger as loggerService,
} from 'services/services';
import { JokeDto } from 'common/types/types';

type Constructor = {
  axiosService: typeof axiosService;
  loggerService: typeof loggerService;
};

class Joke {
  private _axiosService: typeof axiosService;
  private _loggerService: typeof loggerService;

  public constructor(params: Constructor) {
    this._axiosService = params.axiosService;
    this._loggerService = params.loggerService;
  }

  public async getRandom(): Promise<JokeDto> {
    try {
      const response = await this._axiosService.makeGetRequest(
        'https://v2.jokeapi.dev/joke/Any?amount=1&type=single',
      );
      return response.data as JokeDto;
    } catch (error) {
      const err = error as Error;
      this._loggerService.error({ err });

      return { joke: '' };
    }
  }
}

export { Joke };
