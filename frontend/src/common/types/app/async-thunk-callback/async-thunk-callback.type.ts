import { AsyncThunkOptions } from '../async-thunk-options/async-thunk-options.type';

type AsyncThunkCallback<T, K> = (
  payload: K,
  opts: AsyncThunkOptions,
) => Promise<T>;

export type { AsyncThunkCallback };
