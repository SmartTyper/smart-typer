import { service, action } from 'store/store';
import { AppDispatch } from '../app-dispatch/app-dispatch.type';
import { RootState } from '../root-state/root-state.type';

type Extra = { service: typeof service; action: typeof action };

type AsyncThunkOptions = {
  state?: RootState;
  dispatch: AppDispatch;
  extra: Extra;
};

export type { AsyncThunkOptions };
