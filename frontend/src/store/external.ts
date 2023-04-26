import {
  createAsyncThunk as reduxCreateAsyncThunk,
  AsyncThunk,
  createAction,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import { AsyncThunkCallback, AsyncThunkOptions } from 'common/types/types';
import { ActionType } from './common';

const createAsyncThunk = <T, K>(
  actionType: ActionType,
  func: AsyncThunkCallback<T, K>,
): AsyncThunk<T, K, AsyncThunkOptions> => {
  return reduxCreateAsyncThunk<T, K, AsyncThunkOptions>(actionType, func);
};

export { createAsyncThunk, createAction, createSlice, isAnyOf };
