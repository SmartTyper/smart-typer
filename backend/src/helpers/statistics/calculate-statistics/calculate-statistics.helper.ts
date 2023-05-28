import { StatisticsKey } from 'common/enums/enums';
import { Statistics } from 'common/types/types';

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

  const totalTime = oldTotalTime + lessonDuration;
  const todayTime = oldTodayTime + lessonDuration;
  const totalLessons = oldTotalLessons + 1;
  const todayLessons = oldTodayLessons + 1;
  const topSpeed = Math.max(lessonAverageSpeed, oldTopSpeed);
  const todayTopSpeed = Math.max(lessonAverageSpeed, oldTodayTopSpeed);

  return {
    totalTime: newTotalTime ?? totalTime,
    todayTime: newTodayTime ?? todayTime,
    totalLessons: newTotalLessons ?? totalLessons,
    todayLessons: newTodayLessons ?? todayLessons,
    topSpeed: newTopSpeed ?? topSpeed,
    todayTopSpeed: newTodayTopSpeed ?? todayTopSpeed,
    averageSpeed: newAverageSpeed ?? oldAverageSpeed,
    todayAverageSpeed: newTodayAverageSpeed ?? oldTodayAverageSpeed,
  };
};

export { calculateStatistics };
