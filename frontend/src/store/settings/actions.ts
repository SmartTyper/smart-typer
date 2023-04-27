import { createAction, createAsyncThunk } from 'store/external';
import { Settings } from 'common/types/types';
import { SettingsActionType } from './common';

const update = createAsyncThunk(
  SettingsActionType.UPDATE,
  async (
    payload: Partial<Settings>,
    { extra: { service } },
  ): Promise<Partial<Settings>> => {
    const { settingsApiService } = service;
    await settingsApiService.update(payload);
    return payload;
  },
);

const setAll = createAction(
  SettingsActionType.SET_ALL,
  (payload: Settings) => ({ payload }),
);

const resetAllToDefault = createAction(SettingsActionType.RESET_ALL_TO_DEFAULT);

const settings = { update, setAll, resetAllToDefault };

export { settings };
