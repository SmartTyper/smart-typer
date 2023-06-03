import { BktPayload, BktResult } from 'common/types/types';

const bkt = (payload: BktPayload): BktResult => {
  const skills = payload.map(({ skillId, pKnown }) => {
    const random = Math.floor(Math.random() * (5 - 1) + 1);
    return {
      skillId,
      pKnown: pKnown + random,
    };
  });
  return skills;
};

export { bkt };
