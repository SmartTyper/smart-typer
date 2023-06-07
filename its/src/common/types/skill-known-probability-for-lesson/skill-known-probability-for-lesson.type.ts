import { SkillLessonStatistics } from 'common/types/types';

type SkillKnownProbabilityForLesson = {
  skillId: SkillLessonStatistics['skillId'];
  pKnownLesson?: number;
};

export type { SkillKnownProbabilityForLesson };
