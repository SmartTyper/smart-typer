import { ActionOptions } from 'common/types/types';

type CreateActionCallback<T, K> = (
  payload: K,
  opts?: ActionOptions,
) => { payload: T };

export type { CreateActionCallback };
