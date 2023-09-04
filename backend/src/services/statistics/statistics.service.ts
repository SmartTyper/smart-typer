import { CommonKey, HttpCode, HttpErrorMessage } from 'common/enums/enums';
import { Statistics as StatisticsData, UserDto } from 'common/types/types';
import { statistics as statisticsRepository } from 'data/repositories/repositories';
import { HttpError } from 'exceptions/exceptions';

type Constructor = {
  statisticsRepository: typeof statisticsRepository;
};

class Statistics {
  private _statisticsRepository: typeof statisticsRepository;

  public constructor(params: Constructor) {
    this._statisticsRepository = params.statisticsRepository;
  }

  public async updateByUserId(
    userId: UserDto[CommonKey.ID],
    payload: StatisticsData,
  ): Promise<StatisticsData> {
    return this._statisticsRepository.patchByUserId(userId, payload);
  }

  public async getByUserId(
    userId: UserDto[CommonKey.ID],
  ): Promise<StatisticsData> {
    const statistics = await this._statisticsRepository.getByUserId(userId);

    if (!statistics) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
      });
    }

    return statistics;
  }
}

export { Statistics };
