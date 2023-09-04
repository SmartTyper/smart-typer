import { SkillLessonStatistics } from 'common/types/types';

type SkillKnownProbability = {
  skillId: SkillLessonStatistics['skillId'];
  pKnown: number;
};

export type { SkillKnownProbability };
