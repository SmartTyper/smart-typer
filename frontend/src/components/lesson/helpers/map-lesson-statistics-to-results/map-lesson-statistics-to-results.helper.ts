import {
  LessonDisplayedResult,
  LessonWithSkillsStatistics,
} from 'common/types/types';
import {
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
} from 'common/constants/constants';
import { getMinutesFromMilliseconds } from '../helpers';

const mapLessonStatisticsToResults = (
  lesson: LessonWithSkillsStatistics,
): LessonDisplayedResult => {
  const { content, misclicks, timestamps } = lesson;
  const totalTime = [...timestamps].pop()! - [...timestamps].shift()!;
  const totalSymbols = content.length;
  const misclickSymbols = misclicks.filter(Boolean).length;
  const correctSymbols = totalSymbols - misclickSymbols;
  const averageSpeed = Math.round(
    totalSymbols / (totalTime / MILLISECONDS_IN_SECOND / SECONDS_IN_MINUTE),
  );
  return {
    averageSpeed,
    totalSymbols,
    correctSymbols,
    misclickSymbols,
    totalTime: getMinutesFromMilliseconds(totalTime),
  };
};

export { mapLessonStatisticsToResults };
