import { AuthActionType } from './auth/auth';
import { ProfileActionType } from './profile/profile';

type ActionType = AuthActionType | ProfileActionType;

export { AuthActionType, ProfileActionType };
export type { ActionType };
