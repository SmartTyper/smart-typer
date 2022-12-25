import { DbTableName, StatisticsKey } from '~/common/enums/enums';
import { IStatisticsRecord } from '~/common/interfaces/interfaces';

import { Base } from '../base/base.model';

class Statistics extends Base implements IStatisticsRecord {
  public [StatisticsKey.USER_ID]!: IStatisticsRecord[StatisticsKey.USER_ID];

  public [StatisticsKey.TOTAL_TIME]!: IStatisticsRecord[StatisticsKey.TOTAL_TIME];

  public [StatisticsKey.TODAY_TIME]!: IStatisticsRecord[StatisticsKey.TODAY_TIME];

  public [StatisticsKey.TOTAL_LESSONS]!: IStatisticsRecord[StatisticsKey.TOTAL_LESSONS];

  public [StatisticsKey.TODAY_LESSONS]!: IStatisticsRecord[StatisticsKey.TODAY_LESSONS];

  public [StatisticsKey.TOP_SPEED]!: IStatisticsRecord[StatisticsKey.TOP_SPEED];

  public [StatisticsKey.TODAY_TOP_SPEED]!: IStatisticsRecord[StatisticsKey.TODAY_TOP_SPEED];

  public [StatisticsKey.AVERAGE_SPEED]!: IStatisticsRecord[StatisticsKey.AVERAGE_SPEED];

  public [StatisticsKey.TODAY_AVERAGE_SPEED]!: IStatisticsRecord[StatisticsKey.TODAY_AVERAGE_SPEED];

  public static override get tableName(): string {
    return DbTableName.STATISTICS;
  }
}

export { Statistics };
