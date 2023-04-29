import { createAction, createAsyncThunk } from 'store/external/external';
import { SettingsDto } from 'common/types/types';
import { SettingsActionType } from './common';

const update = createAsyncThunk(
  SettingsActionType.UPDATE,
  async (
    payload: Partial<SettingsDto>,
    { extra: { service } },
  ): Promise<Partial<SettingsDto>> => {
    const { settingsApiService } = service;
    await settingsApiService.update(payload);
    return payload;
  },
);

const setAll = createAction(
  SettingsActionType.SET_ALL,
  (payload: SettingsDto) => ({ payload }),
);

const resetAllToDefault = createAction(SettingsActionType.RESET_ALL_TO_DEFAULT);

const settings = { update, setAll, resetAllToDefault };

export { settings };
