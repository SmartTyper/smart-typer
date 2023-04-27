import { AuthActionType } from './auth/auth';
import { ProfileActionType } from './profile/profile';
import { SettingsActionType } from './settings/settings';

type ActionType = AuthActionType | ProfileActionType | SettingsActionType;

export { AuthActionType, ProfileActionType };
export type { ActionType };
