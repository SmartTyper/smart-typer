import {
  AhpLesson,
  AhpSkillCountInLesson,
  AhpSkillLevel,
  PairwiseComparisonMatrix,
} from 'common/types/types';
import { calculatePriorityCoefficient } from 'helpers/helpers';

type Lessons = {
  lessonId: AhpLesson['lessonId'];
  contentType: AhpLesson['contentType'];
  count: AhpSkillCountInLesson['count'];
  level: AhpSkillLevel['level'];
}[];

const calculateAlternativePairwiseComparisonMatrix = (
  lessons: Lessons,
): PairwiseComparisonMatrix => {
  const matrix = new Array(lessons.length)
    .fill(0)
    .map(() => new Array(lessons.length).fill(0)) as PairwiseComparisonMatrix;

  for (let i = 0; i < lessons.length; i++) {
    const firstLesson = lessons[i];
    const firstPriorityCoefficient = calculatePriorityCoefficient(
      firstLesson.level,
      firstLesson.contentType,
    );
    for (let j = 0; j < lessons.length; j++) {
      const secondLesson = lessons[j];
      if (secondLesson.count === 0) {
        matrix[i][j] = 0;
      } else {
        const secondPriorityCoefficient = calculatePriorityCoefficient(
          secondLesson.level,
          secondLesson.contentType,
        );
        matrix[i][j] =
          (firstLesson.count * firstPriorityCoefficient) /
          (secondLesson.count * secondPriorityCoefficient);
      }
    }
  }

  return matrix;
};

export { calculateAlternativePairwiseComparisonMatrix };
