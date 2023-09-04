import { StatisticsKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/interfaces';

interface IStatisticsRecord extends ICommonRecord {
  [StatisticsKey.USER_ID]: number;
  [StatisticsKey.TOTAL_TIME]: number;
  [StatisticsKey.TODAY_TIME]: number;
  [StatisticsKey.TOTAL_LESSONS]: number;
  [StatisticsKey.TODAY_LESSONS]: number;
  [StatisticsKey.TOP_SPEED]: number;
  [StatisticsKey.TODAY_TOP_SPEED]: number;
  [StatisticsKey.AVERAGE_SPEED]: number;
  [StatisticsKey.TODAY_AVERAGE_SPEED]: number;
}

export type { IStatisticsRecord };
