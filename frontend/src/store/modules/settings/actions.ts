import { createAction, createAsyncThunk } from 'store/external/external';
import { SettingsDto } from 'common/types/types';
import { ActionType } from './action-type';

class Settings {
  public update = createAsyncThunk(
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

  public setAll = createAction(ActionType.SET_ALL, (payload: SettingsDto) => ({
    payload,
  }));

  public resetAll = createAction(ActionType.RESET_ALL);
}

const settings = new Settings();

export { settings };
