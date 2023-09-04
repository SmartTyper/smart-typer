import { SettingsKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/interfaces';

interface ISettingsRecord extends ICommonRecord {
  [SettingsKey.USER_ID]: number;
  [SettingsKey.COUNTDOWN_BEFORE_GAME]: number;
  [SettingsKey.GAME_TIME]: number;
  [SettingsKey.IS_SHOWN_IN_RATING]: boolean;
  [SettingsKey.IS_SOUND_TURNED_ON]: boolean;
  [SettingsKey.HAS_EMAIL_NOTIFICATIONS]: boolean;
}

export type { ISettingsRecord };
