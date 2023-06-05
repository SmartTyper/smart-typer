import {
  AhpLesson,
  AhpSkillLevel,
  PairwiseComparisonMatrix,
} from 'common/types/types';
// eslint-disable-next-line max-len
import { calculateAlternativePairwiseComparisonMatrix } from 'helpers/ahp/calculate-alternative-pairwise-comparison-matrix/calculate-alternative-pairwise-comparison-matrix.helper';

const calculateAlternativePairwiseComparisonMatrices = (
  lessons: AhpLesson[],
  skillLevels: AhpSkillLevel[],
): PairwiseComparisonMatrix[] => {
  const matrices = [] as PairwiseComparisonMatrix[];

  for (const skillLevel of skillLevels) {
    const mappedLessons = lessons.map(
      ({ lessonId, contentType, skillsCountInLesson }) => ({
        lessonId,
        contentType,
        count:
          skillsCountInLesson.find(
            (skillCount) => skillCount.skillId === skillLevel.skillId,
          )?.count ?? 0,
        level: skillLevel.level,
      }),
    );

    const matrix = calculateAlternativePairwiseComparisonMatrix(mappedLessons);
    matrices.push(matrix);
  }

  return matrices;
};

export { calculateAlternativePairwiseComparisonMatrices };
