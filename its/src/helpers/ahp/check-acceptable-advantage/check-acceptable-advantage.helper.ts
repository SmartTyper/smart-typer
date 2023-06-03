import { PrioritiesVector } from 'common/types/types';

const checkAcceptableAdvantage = (
  globalPriorities: PrioritiesVector,
  bestLessonIndex: number,
): boolean => {
  const nextBestLessonIndex = globalPriorities.reduce(
    (indexOfMaxValue, value, indexOfValue) => {
      if (bestLessonIndex === indexOfValue && bestLessonIndex === 0) {
        return indexOfValue + 1;
      } else if (bestLessonIndex === indexOfValue) {
        return indexOfMaxValue;
      } else {
        return value > globalPriorities[indexOfMaxValue]
          ? indexOfValue
          : indexOfMaxValue;
      }
    },
    0,
  );

  const worstLessonIndex = globalPriorities.reduce(
    (indexOfMinValue, value, indexOfValue) =>
      value < globalPriorities[indexOfMinValue]
        ? indexOfValue
        : indexOfMinValue,
    0,
  );

  const bestValue = globalPriorities[bestLessonIndex];
  const nextBestValue = globalPriorities[nextBestLessonIndex];
  const worstValue = globalPriorities[worstLessonIndex];

  const hasAcceptableAdvantage =
    bestValue - nextBestValue >=
    (bestValue - worstValue) / (globalPriorities.length - 1);

  return hasAcceptableAdvantage;
};

export { checkAcceptableAdvantage };
