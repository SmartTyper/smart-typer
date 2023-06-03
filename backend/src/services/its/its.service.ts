import {
  ahp as ahpAlgorithm,
  bkt as bktAlgorithm,
  irt as irtAlgorithm,
} from 'smart-typer-its/algorithms/algorithms';
import {
  BktPayload,
  BktResult,
  IrtPayload,
  IrtResult,
  AhpPayload,
  AhpResult,
} from 'common/types/types';

class ITS {
  public async bkt(payload: BktPayload): Promise<BktResult> {
    return bktAlgorithm(payload);
  }

  public async ahp(payload: AhpPayload): Promise<AhpResult> {
    return ahpAlgorithm(payload);
  }

  public async irt(payload: IrtPayload): Promise<IrtResult> {
    return irtAlgorithm(payload);
  }
}

export { ITS };
