import { DEFAULT_SETTINGS } from 'common/constants/constants';
import { ReducerName } from 'common/enums/enums';
import { SettingsDto } from 'common/types/types';
import { createSlice, isAnyOf } from 'store/external/external';
import { settings as settingsActions } from './actions';

type State = SettingsDto;

const initialState: State = DEFAULT_SETTINGS;

const { reducer } = createSlice({
  name: ReducerName.SETTINGS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { update, setAll, resetAll } = settingsActions;
    builder
      .addCase(resetAll, (state) => {
        Object.assign(state, initialState);
      })
      .addMatcher(isAnyOf(update.fulfilled, setAll), (state, action) => {
        Object.assign(state, action.payload);
      });
  },
});

export { reducer };
