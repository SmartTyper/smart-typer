import { ActionOptions } from 'common/types/types';

type AsyncThunkCallback<T, K> = (payload: K, opts: ActionOptions) => Promise<T>;

export type { AsyncThunkCallback };
