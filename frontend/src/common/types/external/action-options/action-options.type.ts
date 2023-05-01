import { Dispatch, RootState, Extra } from 'common/types/types';

type ActionOptions = {
  state?: RootState;
  dispatch: Dispatch;
  extra: Extra;
};

export type { ActionOptions };
