import { SkillLessonStatistics } from 'common/types/types';

type SkillWillLearnProbability = {
  skillId: SkillLessonStatistics['skillId'];
  pWillLearn: number;
};

export type { SkillWillLearnProbability };
