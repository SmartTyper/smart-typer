import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';

const login = createAsyncThunk(
  ActionType.SetUser,
  async (loginPayload: string, { dispatch }) => {
    dispatch(actions.setUser(null));
  },
);

const authActions = {
  ...actions,
  login,
};

export { authActions };
