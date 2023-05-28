import { StatisticsKey } from 'common/enums/enums';
import { IStatisticsRecord } from 'common/interfaces/interfaces';
import {
  RecordWithoutCommonKeys,
  Statistics as StatisticsData,
} from 'common/types/types';
import { Statistics as StatisticsModel } from 'data/models/models';

type Constructor = {
  StatisticsModel: typeof StatisticsModel;
};

class Statistics {
  private _StatisticsModel: typeof StatisticsModel;

  public constructor(params: Constructor) {
    this._StatisticsModel = params.StatisticsModel;
  }

  public patchByUserId(
    userId: number,
    payload: StatisticsData,
  ): Promise<IStatisticsRecord> {
    return this._StatisticsModel
      .query()
      .findOne({ userId })
      .patchAndFetch(payload)
      .execute();
  }

  public getByUserId(
    userId: number,
  ): Promise<
    | RecordWithoutCommonKeys<Omit<IStatisticsRecord, StatisticsKey.USER_ID>>
    | undefined
  > {
    return this._StatisticsModel
      .query()
      .select(
        StatisticsKey.TOTAL_TIME,
        StatisticsKey.TODAY_TIME,
        StatisticsKey.TOTAL_LESSONS,
        StatisticsKey.TODAY_LESSONS,
        StatisticsKey.TOP_SPEED,
        StatisticsKey.TODAY_TOP_SPEED,
        StatisticsKey.AVERAGE_SPEED,
        StatisticsKey.TODAY_AVERAGE_SPEED,
      )
      .findOne({ userId })
      .execute();
  }
}
export { Statistics };
