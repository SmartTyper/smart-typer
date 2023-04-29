import { DEFAULT_SETTINGS } from 'common/constants/constants';
import { ReducerName } from 'common/enums/enums';
import { SettingsDto } from 'common/types/types';
import { createSlice, isAnyOf } from 'store/external/external';
import { actions } from './actions';

type State = SettingsDto;

const initialState: State = DEFAULT_SETTINGS;

const { reducer } = createSlice({
  name: ReducerName.PROFILE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { update, setAll, resetAllToDefault } = actions;
    builder
      .addCase(resetAllToDefault, (state) => {
        Object.assign(state, initialState);
      })
      .addMatcher(isAnyOf(update.fulfilled, setAll), (state, action) => {
        Object.assign(state, action.payload);
      });
  },
});

export { reducer };
