import { TableName, SettingsKey } from 'common/enums/enums';
import { ISettingsRecord } from 'common/interfaces/interfaces';

import { Base } from '../base/base.model';

class Settings extends Base implements ISettingsRecord {
  public [SettingsKey.USER_ID]!: ISettingsRecord[SettingsKey.USER_ID];

  public [SettingsKey.COUNTDOWN_BEFORE_GAME]!: ISettingsRecord[SettingsKey.COUNTDOWN_BEFORE_GAME];

  public [SettingsKey.GAME_TIME]!: ISettingsRecord[SettingsKey.GAME_TIME];

  public [SettingsKey.IS_SHOWN_IN_RATING]!: ISettingsRecord[SettingsKey.IS_SHOWN_IN_RATING];

  public [SettingsKey.IS_SOUND_TURNED_ON]!: ISettingsRecord[SettingsKey.IS_SOUND_TURNED_ON];

  public [SettingsKey.HAS_EMAIL_NOTIFICATIONS]!: ISettingsRecord[SettingsKey.HAS_EMAIL_NOTIFICATIONS];

  public static override get tableName(): string {
    return TableName.SETTINGS;
  }
}

export { Settings };
