import { DEFAULT_SETTINGS } from 'common/constants/constants';
import { ReducerName } from 'common/enums/enums';
import { Settings } from 'common/types/types';
import { createSlice, isAnyOf } from 'store/external';
import { settings as settingsActions } from './actions';

type State = Settings;

const initialState: State = DEFAULT_SETTINGS;

const { reducer } = createSlice({
  name: ReducerName.PROFILE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { update, setAll, resetAllToDefault } = settingsActions;
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
