import {
  SkillLessonStatistics,
  SkillWillLearnProbability,
} from 'common/types/types';

const calculateWillLearnProbability = (
  skills: SkillLessonStatistics[],
): SkillWillLearnProbability[] => {
  return skills.map(({ skillId, m, n, t }) => {
    const pWillLearn = ((n - m) / 95) * 0.5 + (1 / (200 * t)) * 0.5;
    return {
      skillId,
      pWillLearn,
    };
  });
};

export { calculateWillLearnProbability };
