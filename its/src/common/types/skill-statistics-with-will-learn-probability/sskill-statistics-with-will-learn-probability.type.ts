import {
  SkillLessonStatistics,
  SkillWillLearnProbability,
} from 'common/types/types';

type SkillStatisticsWithWillLearnProbability = SkillLessonStatistics &
  SkillWillLearnProbability;

export type { SkillStatisticsWithWillLearnProbability };
