import {
  axios as axiosService,
  logger as loggerService,
} from 'services/services';
import { JokeDto } from 'common/types/types';
import { JOKE_API_REQUEST_ENDPOINT } from 'common/constants/constants';
import { HttpError } from 'exceptions/exceptions';
import { HttpCode, HttpErrorMessage } from 'common/enums/enums';

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
        `${JOKE_API_REQUEST_ENDPOINT}?amount=1&type=single`,
      );
      const { joke } = response.data as JokeDto;
      return { joke };
    } catch (error) {
      const err = error as Error;
      this._loggerService.error({ err });
      throw new HttpError({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        message: HttpErrorMessage.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

export { Joke };
