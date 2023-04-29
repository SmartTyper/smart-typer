import { AuthActionType } from './auth/common';
import { ProfileActionType } from './profile/common';
import { SettingsActionType } from './settings/common';
import { RacingActionType } from './racing/common';

type ActionType =
  | AuthActionType
  | ProfileActionType
  | SettingsActionType
  | RacingActionType;

export {
  AuthActionType,
  ProfileActionType,
  RacingActionType,
  SettingsActionType,
};
export type { ActionType };
