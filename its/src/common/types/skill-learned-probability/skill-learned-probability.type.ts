import { SkillLessonStatistics } from 'common/types/types';

type SkillLearnedProbability = {
  skillId: SkillLessonStatistics['skillId'];
  pLearned: number;
};

export type { SkillLearnedProbability };
