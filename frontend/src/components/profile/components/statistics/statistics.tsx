import { CardHeaderColor, CardSize } from 'common/enums/enums';
import { FC, Statistics as StatisticsData } from 'common/types/types';
import { Card } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  statistics: StatisticsData | null;
};

const Statistics: FC<Props> = ({ statistics }) => {
  const {
    totalTime,
    todayTime,
    totalLessons,
    todayLessons,
    topSpeed,
    todayTopSpeed,
    averageSpeed,
    todayAverageSpeed,
  } = statistics ?? ({} as StatisticsData);
  return (
    <>
      <h3>All time</h3>
      <div className={styles.statisticsSection}>
        <Card
          title="Total time"
          color={CardHeaderColor.YELLOW}
          size={CardSize.SMALL}
          centeredTitle
        >
          <p className={styles.statisticValue}>{totalTime}</p>
        </Card>
        <Card
          title="Total lessons"
          color={CardHeaderColor.ORANGE}
          size={CardSize.SMALL}
          centeredTitle
        >
          <p className={styles.statisticValue}>{totalLessons}</p>
        </Card>
        <Card
          title="Top speed (wpm)"
          color={CardHeaderColor.BLUE}
          size={CardSize.SMALL}
          centeredTitle
        >
          <p className={styles.statisticValue}>{topSpeed}</p>
        </Card>
        <Card
          title="Average speed (wpm)"
          color={CardHeaderColor.PINK}
          size={CardSize.SMALL}
          centeredTitle
        >
          <p className={styles.statisticValue}>{averageSpeed}</p>
        </Card>
      </div>
      <h3>Today</h3>
      <div className={styles.statisticsSection}>
        <Card
          title="Total time"
          color={CardHeaderColor.YELLOW}
          size={CardSize.SMALL}
          centeredTitle
        >
          <p className={styles.statisticValue}>{todayTime}</p>
        </Card>
        <Card
          title="Total lessons"
          color={CardHeaderColor.ORANGE}
          size={CardSize.SMALL}
          centeredTitle
        >
          <p className={styles.statisticValue}>{todayLessons}</p>
        </Card>
        <Card
          title="Top speed (wpm)"
          color={CardHeaderColor.BLUE}
          size={CardSize.SMALL}
          centeredTitle
        >
          <p className={styles.statisticValue}>{todayTopSpeed}</p>
        </Card>
        <Card
          title="Average speed (wpm)"
          color={CardHeaderColor.PINK}
          size={CardSize.SMALL}
          centeredTitle
        >
          <p className={styles.statisticValue}>{todayAverageSpeed}</p>
        </Card>
      </div>
    </>
  );
};

export { Statistics };
