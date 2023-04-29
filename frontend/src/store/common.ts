import { AuthActionType } from './auth/auth';
import { ProfileActionType } from './profile/profile';
import { SettingsActionType } from './settings/settings';
import { RacingActionType } from './racing/racing';

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
