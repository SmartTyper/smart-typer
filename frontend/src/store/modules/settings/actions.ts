import { createAction, createAsyncThunk } from 'store/external/external';
import { SettingsDto } from 'common/types/types';
import { ActionType } from './action-type';

const update = createAsyncThunk(
  ActionType.UPDATE,
  async (
    payload: Partial<SettingsDto>,
    { extra: { services } },
  ): Promise<Partial<SettingsDto>> => {
    const { settingsApi: settingsApiService } = services;
    await settingsApiService.update(payload);
    return payload;
  },
);

const setAll = createAction(
  ActionType.SET_ALL,
  (payload: SettingsDto) => ({ payload }),
);

const resetAllToDefault = createAction(ActionType.RESET_ALL_TO_DEFAULT);

const actions = { update, setAll, resetAllToDefault };

export { actions };
