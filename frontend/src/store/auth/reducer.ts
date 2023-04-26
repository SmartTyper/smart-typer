import { HttpErrorMessage, ReducerName } from 'common/enums/enums';
import { IUser } from 'common/interfaces/interfaces';
import { createSlice, isAnyOf } from 'store/external';
import { authActions } from './actions';

type State = {
  user: IUser | null;
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
    const { logIn, register, logInGoogle, logOut, setError } = authActions;
    builder
      .addCase(logOut.fulfilled, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(setError, (state, action) => {
        state.error = action.payload;
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
