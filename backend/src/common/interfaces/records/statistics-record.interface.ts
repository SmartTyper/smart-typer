import { StatisticsKey } from '~/common/enums/enums';

interface IStatisticsRecord {
  [StatisticsKey.ID]: number;
  [StatisticsKey.USER_ID]: number;
  [StatisticsKey.TOTAL_TIME]: number;
  [StatisticsKey.TODAY_TIME]: number;
  [StatisticsKey.TOTAL_LESSONS]: number;
  [StatisticsKey.TODAY_LESSONS]: number;
  [StatisticsKey.TOP_SPEED]: number;
  [StatisticsKey.TODAY_TOP_SPEED]: number;
  [StatisticsKey.AVERAGE_SPEED]: number;
  [StatisticsKey.TODAY_AVERAGE_SPEED]: number;
  [StatisticsKey.CREATED_AT]: string;
  [StatisticsKey.UPDATED_AT]: string;
}

export type { IStatisticsRecord };
