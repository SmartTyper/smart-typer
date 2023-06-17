import { IrtResult, SkillKnownProbabilities } from 'common/types/types';

const calculateKnownProbability = (
  skills: SkillKnownProbabilities[],
): IrtResult => {
  return skills.map(({ skillId, pKnown, pKnownLesson }) => {
    const resultPKnown = pKnownLesson ? (pKnown + pKnownLesson) / 2 : pKnown;

    return {
      skillId,
      pKnown: resultPKnown,
    };
  });
};

export { calculateKnownProbability };
