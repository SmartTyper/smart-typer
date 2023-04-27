import { HttpErrorMessage, ReducerName } from 'common/enums/enums';
import { UserDto } from 'common/types/types';
import { createSlice, isAnyOf } from 'store/external';
import { auth as authActions } from './actions';

type State = {
  user: UserDto | null;
  error: HttpErrorMessage | null;
};

const initialState: State = {
  user: null,
  error: null,
};

const { reducer } = createSlice({
  name: ReducerName.AUTH,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { logIn, register, logInGoogle, logOut, setError, updateUser } =
      authActions;
    builder
      .addCase(logOut.fulfilled, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(setError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUser, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      })
      .addMatcher(
        isAnyOf(logIn.fulfilled, register.fulfilled, logInGoogle.fulfilled),
        (state, action) => {
          if (action.payload) {
            state.user = action.payload;
          }
        },
      );
  },
});

export { reducer };
