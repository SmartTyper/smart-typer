import { IStatisticsRecord } from 'common/interfaces/interfaces';
import { Statistics as StatisticsModel } from 'data/models/models';

type Constructor = {
  StatisticsModel: typeof StatisticsModel;
};

class Statistics {
  private _StatisticsModel: typeof StatisticsModel;

  public constructor(params: Constructor) {
    this._StatisticsModel = params.StatisticsModel;
  }
}
export { Statistics };
