import { SettingsKey } from 'common/enums/enums';
import { ISettingsRecord } from 'common/interfaces/interfaces';
import { RecordWithoutCommonKeys } from 'common/types/types';
import { Settings as SettingsModel } from 'data/models/models';
import { SettingsDto } from 'smart-typer-shared/common/types/types';

type Constructor = {
  SettingsModel: typeof SettingsModel;
};

class Settings {
  private _SettingsModel: typeof SettingsModel;

  public constructor(params: Constructor) {
    this._SettingsModel = params.SettingsModel;
  }

  public async patchByUserId(
    userId: number,
    payload: Partial<SettingsDto>,
  ): Promise<
    RecordWithoutCommonKeys<Omit<ISettingsRecord, SettingsKey.USER_ID>>
  > {
    return this._SettingsModel
      .query()
      .findOne({ userId })
      .patch(payload)
      .returning([
        SettingsKey.COUNTDOWN_BEFORE_GAME,
        SettingsKey.GAME_TIME,
        SettingsKey.HAS_EMAIL_NOTIFICATIONS,
        SettingsKey.IS_SHOWN_IN_RATING,
        SettingsKey.IS_SOUND_TURNED_ON,
      ])
      .castTo<
        RecordWithoutCommonKeys<Omit<ISettingsRecord, SettingsKey.USER_ID>>
      >();
  }
}
export { Settings };
