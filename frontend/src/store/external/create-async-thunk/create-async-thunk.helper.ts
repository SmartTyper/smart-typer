import {
  createAsyncThunk as reduxCreateAsyncThunk,
  AsyncThunk,
} from '@reduxjs/toolkit';
import { AsyncThunkCallback, ActionOptions } from 'common/types/types';
import { ActionType } from 'store/modules/action-type';

const createAsyncThunk = <T, K>(
  actionType: ActionType,
  func: AsyncThunkCallback<T, K>,
): AsyncThunk<T, K, ActionOptions> => {
  return reduxCreateAsyncThunk<T, K, ActionOptions>(actionType, func);
};

export { createAsyncThunk };
