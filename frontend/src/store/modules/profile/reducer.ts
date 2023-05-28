import { ReducerName } from 'common/enums/enums';
import { Rating, Statistics, UserDto } from 'common/types/types';
import { createSlice } from 'store/external/external';
import { actions } from './actions';

type State = {
  user: UserDto | null;
  statistics: Statistics | null;
  rating: Rating | null;
};

const initialState: State = {
  user: null,
  statistics: null,
  rating: null,
};

const { reducer } = createSlice({
  name: ReducerName.PROFILE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { loadUser, resetAll, deleteAvatar, updatePersonalInfo, updateAvatar } =
      actions;
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        const { statistics, rating, ...user } = action.payload;
        state.user = user;
        state.statistics = statistics;
        state.rating = rating;
      })
      .addCase(resetAll, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(deleteAvatar.fulfilled, (state) => {
        if (state.user) {
          state.user.photoUrl = null;
        }
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        if (state.user) {
          state.user.photoUrl = action.payload;
        }
      })
      .addCase(updatePersonalInfo.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      });
  },
});

export { reducer };
