import { StatisticsKey } from 'common/enums/enums';
import { Statistics } from 'common/types/types';
import {
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
} from 'smart-typer-shared/common/constants/constants';

type CalculateStatisticsArgs = {
  oldStatistics: Statistics;
  timestamps: number[];
  newStatistics: Partial<Statistics>;
  lessonAverageSpeed: Statistics[StatisticsKey.AVERAGE_SPEED];
};

const calculateStatistics = ({
  oldStatistics,
  timestamps,
  newStatistics,
  lessonAverageSpeed,
}: CalculateStatisticsArgs): Statistics => {
  const {
    totalTime: oldTotalTime,
    todayTime: oldTodayTime,
    totalLessons: oldTotalLessons,
    todayLessons: oldTodayLessons,
    topSpeed: oldTopSpeed,
    todayTopSpeed: oldTodayTopSpeed,
    averageSpeed: oldAverageSpeed,
    todayAverageSpeed: oldTodayAverageSpeed,
  } = oldStatistics;

  const {
    totalTime: newTotalTime,
    todayTime: newTodayTime,
    totalLessons: newTotalLessons,
    todayLessons: newTodayLessons,
    topSpeed: newTopSpeed,
    todayTopSpeed: newTodayTopSpeed,
    averageSpeed: newAverageSpeed,
    todayAverageSpeed: newTodayAverageSpeed,
  } = newStatistics;

  const lessonDuration =
    ([...timestamps].pop() as number) - ([...timestamps].shift() as number);

  const lessonDurationInMin =
    lessonDuration / MILLISECONDS_IN_SECOND / SECONDS_IN_MINUTE;
  const totalTime = oldTotalTime + lessonDurationInMin;
  const todayTime = oldTodayTime + lessonDurationInMin;
  const totalLessons = oldTotalLessons + 1;
  const todayLessons = oldTodayLessons + 1;
  const topSpeed = Math.max(lessonAverageSpeed, oldTopSpeed);
  const todayTopSpeed = Math.max(lessonAverageSpeed, oldTodayTopSpeed);

  return {
    totalTime: Math.floor(newTotalTime ?? totalTime),
    todayTime: Math.floor(newTodayTime ?? todayTime),
    totalLessons: newTotalLessons ?? totalLessons,
    todayLessons: newTodayLessons ?? todayLessons,
    topSpeed: Math.floor(newTopSpeed ?? topSpeed),
    todayTopSpeed: Math.floor(newTodayTopSpeed ?? todayTopSpeed),
    averageSpeed: Math.floor(newAverageSpeed ?? oldAverageSpeed),
    todayAverageSpeed: Math.floor(newTodayAverageSpeed ?? oldTodayAverageSpeed),
  };
};

export { calculateStatistics };
