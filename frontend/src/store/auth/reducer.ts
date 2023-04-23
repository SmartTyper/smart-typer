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
    const { logIn, register, logInGoogle, logout } = authActions;
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addMatcher(
        isAnyOf(logIn.fulfilled, register.fulfilled, logInGoogle.fulfilled),
        (state, action) => {
          state.user = action.payload;
        },
      );
  },
});

export { reducer };
