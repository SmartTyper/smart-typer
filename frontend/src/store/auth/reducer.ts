import { HttpErrorMessage, ReducerName } from 'common/enums/enums';
import { Settings, User } from 'common/types/types';
import { createSlice, isAnyOf } from 'store/external';
import { authActions } from './actions';

type State = {
  user: User | null;
  settings: Settings | null;
  error: HttpErrorMessage | null;
};

const initialState: State = {
  user: null,
  settings: null,
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
            const { settings, ...user } = action.payload;
            state.user = user;
            state.settings = settings;
          }
        },
      );
  },
});

export { reducer };
