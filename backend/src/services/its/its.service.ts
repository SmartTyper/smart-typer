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
    return payload as unknown as BktResult;
  }

  public async AHP(payload: AhpPayload): Promise<AhpResult> {
    return payload as unknown as AhpResult;
  }

  public async IRT(payload: IrtPayload): Promise<IrtResult> {
    return payload as unknown as IrtResult;
  }
}

export { ITS };
