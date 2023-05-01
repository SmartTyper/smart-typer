import {
  auth as authActions,
  profile as profileActions,
  racing as racingActions,
  settings as settingsActions,
} from 'store/modules/actions';
import {
  AuthActionType,
  ProfileActionType,
  RacingActionType,
  SettingsActionType,
} from 'store/modules/action-type';
import { AsyncThunk, ActionOptions } from 'common/types/types';

const REQUEST_ACTIONS_TYPES = [
  AuthActionType.LOG_IN,
  AuthActionType.REGISTER,
  AuthActionType.LOG_OUT,
  AuthActionType.LOG_IN_GOOGLE,
  AuthActionType.SET_PASSWORD,
  AuthActionType.RESET_PASSWORD,

  ProfileActionType.DELETE_AVATAR,
  ProfileActionType.UPDATE_AVATAR,
  ProfileActionType.UPDATE_INFO,

  RacingActionType.LOAD_AVAILABLE_ROOMS,
  RacingActionType.CREATE_ROOM,
  RacingActionType.SEND_ROOM_URL_TO_EMAILS,

  SettingsActionType.UPDATE,
] as const;

const actions = {
  ...authActions,
  ...profileActions,
  ...racingActions,
  ...settingsActions,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyAsyncThunk = AsyncThunk<any, any, ActionOptions>;

const requestActions = Object.values(actions).filter((action) => {
  const type = (action as AnyAsyncThunk).typePrefix;
  const requestActionTypes = REQUEST_ACTIONS_TYPES.map((actionType) =>
    String(actionType),
  );
  return requestActionTypes.includes(type);
}) as AnyAsyncThunk[];

const STARTED_ACTIONS = requestActions.map((action) => action.pending);

const FINISHED_ACTIONS = [
  ...requestActions.map((action) => action.fulfilled),
  ...requestActions.map((action) => action.rejected),
];

export { STARTED_ACTIONS, FINISHED_ACTIONS, REQUEST_ACTIONS_TYPES };
