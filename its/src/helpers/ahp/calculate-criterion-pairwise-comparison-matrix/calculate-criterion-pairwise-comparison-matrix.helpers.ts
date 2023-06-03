import { AhpSkillLevel, PairwiseComparisonMatrix } from 'common/types/types';

const calculateCriterionPairwiseComparisonMatrix = (
  skills: AhpSkillLevel[],
): PairwiseComparisonMatrix => {
  const matrix = [] as PairwiseComparisonMatrix;

  for (let i = 0; i < skills.length; i++) {
    const firstSkillLevel = skills[i].level;
    for (let j = 0; j < skills.length; j++) {
      const secondSkillLevel = skills[j].level;
      matrix[i][j] = firstSkillLevel / secondSkillLevel;
    }
  }

  return matrix;
};

export { calculateCriterionPairwiseComparisonMatrix };
