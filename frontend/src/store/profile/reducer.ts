import { HttpErrorMessage, ReducerName } from 'common/enums/enums';
import { Rating, Statistics, User } from 'common/types/types';
import { createSlice } from 'store/external';
import { profileActions } from './actions';

type State = {
  user: User | null;
  statistics: Statistics | null;
  rating: Rating | null;
  error: HttpErrorMessage | null;
};

const initialState: State = {
  user: null,
  statistics: null,
  rating: null,
  error: null,
};

const { reducer } = createSlice({
  name: ReducerName.PROFILE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { loadUser } = profileActions;
    builder.addCase(loadUser.fulfilled, (state, action) => {
      const { statistics, rating, ...user } = action.payload;
      state.user = user;
      state.statistics = statistics;
      state.rating = rating;
    });
  },
});

export { reducer };
