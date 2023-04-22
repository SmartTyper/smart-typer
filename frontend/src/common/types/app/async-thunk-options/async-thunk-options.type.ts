import { service } from 'store/store';
import { AppDispatch } from '../app-dispatch/app-dispatch.type';
import { RootState } from '../root-state/root-state.type';

type AsyncThunkOptions = {
  state?: RootState;
  dispatch: AppDispatch;
  extra: typeof service;
};

export type { AsyncThunkOptions };
