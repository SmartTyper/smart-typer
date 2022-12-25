import { TableName, SettingsKey } from '~/common/enums/enums';
import { ISettingsRecord } from '~/common/interfaces/interfaces';

import { Base } from '../base/base.model';

class Settings extends Base implements ISettingsRecord {
  public [SettingsKey.USER_ID]!: ISettingsRecord[SettingsKey.USER_ID];

  public [SettingsKey.COUNTDOWN_BEFORE_GAME]!: ISettingsRecord[SettingsKey.COUNTDOWN_BEFORE_GAME];

  public [SettingsKey.GAME_TIME]!: ISettingsRecord[SettingsKey.GAME_TIME];

  public [SettingsKey.IS_SHOWN_IN_RATING]!: ISettingsRecord[SettingsKey.IS_SHOWN_IN_RATING];

  public [SettingsKey.HAS_GAME_VOICE]!: ISettingsRecord[SettingsKey.HAS_GAME_VOICE];

  public [SettingsKey.HAS_EMAIL_NOTIFICATIONS]!: ISettingsRecord[SettingsKey.HAS_EMAIL_NOTIFICATIONS];

  public [SettingsKey.HAS_LESSON_VOICE]!: ISettingsRecord[SettingsKey.HAS_LESSON_VOICE];

  public static override get tableName(): string {
    return TableName.SETTINGS;
  }
}

export { Settings };
