import { service, action } from 'store/store';
import { Dispatch } from '../dispatch/dispatch.type';
import { RootState } from '../root-state/root-state.type';

type Extra = { service: typeof service; action: typeof action };

type AsyncThunkOptions = {
  state?: RootState;
  dispatch: Dispatch;
  extra: Extra;
};

export type { AsyncThunkOptions };
