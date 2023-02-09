import { SettingsKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/records/common-records/common-record.interface';

interface ISettingsRecord extends ICommonRecord {
  [SettingsKey.USER_ID]: number;
  [SettingsKey.COUNTDOWN_BEFORE_GAME]: number;
  [SettingsKey.GAME_TIME]: number;
  [SettingsKey.IS_SHOWN_IN_RATING]: boolean;
  [SettingsKey.HAS_GAME_VOICE]: boolean;
  [SettingsKey.HAS_EMAIL_NOTIFICATIONS]: boolean;
  [SettingsKey.HAS_LESSON_VOICE]: boolean;
}

export type { ISettingsRecord };
