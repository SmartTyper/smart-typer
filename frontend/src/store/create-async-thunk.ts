import {
  createAsyncThunk as reduxCreateAsyncThunk,
  AsyncThunk,
} from '@reduxjs/toolkit';
import { ActionType as AuthActionType } from './auth/common';
import { AsyncThunkCallback, AsyncThunkOptions } from 'common/types/types';

type ActionType = AuthActionType;

const createAsyncThunk = <T, K>(
  actionType: ActionType,
  func: AsyncThunkCallback<T, K>,
): AsyncThunk<T, K, AsyncThunkOptions> => {
  return reduxCreateAsyncThunk<T, K, AsyncThunkOptions>(actionType, func);
};

export { createAsyncThunk };
