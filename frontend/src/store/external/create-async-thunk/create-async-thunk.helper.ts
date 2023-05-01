import {
  createAsyncThunk as reduxCreateAsyncThunk,
  AsyncThunk,
  AsyncThunkPayloadCreator,
} from '@reduxjs/toolkit';
import { AsyncThunkOptions } from 'common/types/types';
import { ActionType } from 'store/modules/action-type';

const createAsyncThunk = <T, K>(
  actionType: ActionType,
  func: AsyncThunkPayloadCreator<T, K, AsyncThunkOptions>,
): AsyncThunk<T, K, AsyncThunkOptions> => {
  return reduxCreateAsyncThunk<T, K, AsyncThunkOptions>(actionType, func);
};

export { createAsyncThunk };
