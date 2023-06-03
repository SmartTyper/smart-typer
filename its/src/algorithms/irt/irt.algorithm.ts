import { IrtPayload, IrtResult } from 'common/types/types';

const irt = (payload: IrtPayload): IrtResult => {
  const skills = payload.map(({ skillId }) => {
    const random = Math.floor(Math.random() * (20 - 10) + 10);
    return { skillId, pKnown: random };
  });
  return skills;
};

export { irt };
