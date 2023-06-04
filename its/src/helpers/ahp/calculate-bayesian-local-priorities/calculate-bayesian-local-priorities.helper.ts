import {
  AhpLesson,
  CriterionPrioritiesVector,
  PrioritiesVector,
} from 'common/types/types';

const calculateSimilarityCriterion = (
  lastFinishedLessons: AhpLesson[],
  skillId: number,
): number => {
  let result = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 5; j++) {
      const firstCount =
        lastFinishedLessons[i].skillsCountInLesson.find(
          (skill) => skill.skillId === skillId,
        )?.count ?? 0;
      const secondCount =
        lastFinishedLessons[j].skillsCountInLesson.find(
          (skill) => skill.skillId === skillId,
        )?.count ?? 0;
      result += Math.abs(firstCount - secondCount);
    }
  }
  return result / 10;
};

const calculateBayesianLocalPriorities = (
  oldCriterionLocalPrioritiesWithIds: CriterionPrioritiesVector,
  lastFinishedLessons: AhpLesson[],
): PrioritiesVector => {
  const similarityCriteria = new Map(
    oldCriterionLocalPrioritiesWithIds.map(({ skillId }) => {
      const similarityCriterion = calculateSimilarityCriterion(
        lastFinishedLessons,
        skillId,
      );
      return [skillId, similarityCriterion];
    }),
  );
  const denominator = oldCriterionLocalPrioritiesWithIds.reduce(
    (sum, { skillId, value }) => sum + value * similarityCriteria.get(skillId)!,
    0,
  );
  const bayesianLocalPriorities = oldCriterionLocalPrioritiesWithIds.map(
    ({ skillId, value }) =>
      (value * similarityCriteria.get(skillId)!) / denominator,
  );

  return bayesianLocalPriorities;
};

export { calculateBayesianLocalPriorities };
