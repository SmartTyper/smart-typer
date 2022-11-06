import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';

const login = createAsyncThunk(
  ActionType.SetUser,
  async (loginPayload: any, { dispatch }) => {
    dispatch(actions.setUser({}));
  },
);

const authActions = {
  ...actions,
  login,
};

export { authActions };
