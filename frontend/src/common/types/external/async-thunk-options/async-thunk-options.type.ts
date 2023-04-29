import { Dispatch, RootState, Extra } from 'common/types/types';

type AsyncThunkOptions = {
  state?: RootState;
  dispatch: Dispatch;
  extra: Extra;
};

export type { AsyncThunkOptions };
