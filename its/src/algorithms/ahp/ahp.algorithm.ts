import math from 'mathjs';
import { AhpPayload, AhpResult } from 'common/types/types';
import {
  calculateAlternativePairwiseComparisonMatrices,
  calculateCriterionPairwiseComparisonMatrix,
  calculateGlobalPriorities,
  calculateLocalPriorities,
  checkAcceptableAdvantage,
  checkConsistency,
  findLessonWithMaxWorstSkillCount,
} from 'helpers/helpers';

const ahp = (payload: AhpPayload): AhpResult => {
  const { lessons, lastFinishedLessonIds, skillLevels } = payload;
  const criterionMpc = calculateCriterionPairwiseComparisonMatrix(skillLevels);
  const alternativeMpcs = calculateAlternativePairwiseComparisonMatrices(
    lessons,
    skillLevels,
  );
  const areConsistent = checkConsistency([...alternativeMpcs, criterionMpc]);
  if (!areConsistent) {
    const { lessonId } = findLessonWithMaxWorstSkillCount(lessons, skillLevels);
    return { lessonId };
  }

  const criterionLocalPriorities = calculateLocalPriorities(criterionMpc);
  const alternativeLocalPriorityMatrix = alternativeMpcs.map((alternativeMpc) =>
    calculateLocalPriorities(alternativeMpc),
  );
  const transposedAlternativeLocalPriorityMatrix = math.transpose(
    alternativeLocalPriorityMatrix,
  );

  const globalPriorities = calculateGlobalPriorities(
    criterionLocalPriorities,
    transposedAlternativeLocalPriorityMatrix,
  );

  const bestLessonIndex = globalPriorities.reduce(
    (indexOfMaxValue, value, indexOfValue) =>
      value > globalPriorities[indexOfMaxValue]
        ? indexOfValue
        : indexOfMaxValue,
    0,
  );

  const hasAcceptableAdvantage = checkAcceptableAdvantage(
    globalPriorities,
    bestLessonIndex,
  );

  if (hasAcceptableAdvantage) {
    const { lessonId } = lessons[bestLessonIndex];

    return { lessonId };
  }

  //
};

export { ahp };
