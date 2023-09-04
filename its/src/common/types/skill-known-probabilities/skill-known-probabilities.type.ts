import {
  SkillKnownProbabilityForLesson,
  SkillLessonStatistics,
} from 'common/types/types';

type SkillKnownProbabilities = SkillKnownProbabilityForLesson & {
  pKnown: SkillLessonStatistics['pKnown'];
};

export type { SkillKnownProbabilities };
