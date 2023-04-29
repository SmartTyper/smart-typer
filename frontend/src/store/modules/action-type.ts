import { ActionType as AuthActionType } from './auth/action-type';
import { ActionType as ProfileActionType } from './profile/action-type';
import { ActionType as SettingsActionType } from './settings/action-type';
import { ActionType as RacingActionType } from './racing/action-type';

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
