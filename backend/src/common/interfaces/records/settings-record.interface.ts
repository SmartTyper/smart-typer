import { SettingsKey } from '~/common/enums/enums';

interface ISettingsRecord {
  [SettingsKey.ID]: number;
  [SettingsKey.USER_ID]: number;
  [SettingsKey.COUNTDOWN_BEFORE_GAME]: number;
  [SettingsKey.GAME_TIME]: number;
  [SettingsKey.IS_SHOWN_IN_RATING]: boolean;
  [SettingsKey.HAS_GAME_VOICE]: boolean;
  [SettingsKey.HAS_EMAIL_NOTIFICATIONS]: boolean;
  [SettingsKey.HAS_LESSON_VOICE]: boolean;
  [SettingsKey.CREATED_AT]: string;
  [SettingsKey.UPDATED_AT]: string;
}

export type { ISettingsRecord };
