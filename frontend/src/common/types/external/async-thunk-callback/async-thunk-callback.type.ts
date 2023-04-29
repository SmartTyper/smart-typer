import { AsyncThunkOptions } from 'common/types/types';

type AsyncThunkCallback<T, K> = (
  payload: K,
  opts: AsyncThunkOptions,
) => Promise<T>;

export type { AsyncThunkCallback };
