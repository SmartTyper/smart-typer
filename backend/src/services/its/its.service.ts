import {
  BktPayload,
  BktResult,
  IrtPayload,
  IrtResult,
  AhpPayload,
  AhpResult,
} from 'common/types/types';

class ITS {
  public async BKT(payload: BktPayload): Promise<BktResult> {
    const random = Math.floor(Math.random() * (5 - 1) + 1);
    const skills = payload.map(({ skillId, pKnown }) => ({
      skillId,
      pKnown: pKnown + random,
    }));
    return skills;
  }

  public async AHP(payload: AhpPayload): Promise<AhpResult> {
    const random = Math.floor(Math.random() * payload.lessons.length);
    const { lessonId } = payload.lessons[random];
    return { lessonId };
  }

  public async IRT(payload: IrtPayload): Promise<IrtResult> {
    const random = Math.floor(Math.random() * (20 - 10) + 10);
    const skills = payload.map(({ skillId }) => ({ skillId, pKnown: random }));
    return skills;
  }
}

export { ITS };
