import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name/reducer-name.enum';
import { authActions } from './actions';
import { IUser } from 'common/interfaces/interfaces';

type State = {
  user: IUser | null;
};

const initialState: State = {
  user: null,
};

const { reducer } = createSlice({
  name: ReducerName.AUTH,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { login, register, loginGoogle, logout } = authActions;
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addMatcher(
        isAnyOf(login.fulfilled, register.fulfilled, loginGoogle.fulfilled),
        (state, action) => {
          state.user = action.payload;
        },
      );
  },
});

export { reducer };
