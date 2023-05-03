import {
  auth as authActions,
  profile as profileActions,
  racing as racingActions,
  settings as settingsActions,
  lessons as lessonsActions,
} from 'store/modules/actions';
import {
  AuthActionType,
  ProfileActionType,
  RacingActionType,
  SettingsActionType,
  LessonsActionType,
} from 'store/modules/action-type';
import { AsyncThunk, AsyncThunkOptions } from 'common/types/types';

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
  RacingActionType.SET_CURRENT_ROOM,
  RacingActionType.LOAD_SHARE_ROOM_URL,

  SettingsActionType.UPDATE,

  LessonsActionType.CREATE,
  LessonsActionType.LOAD_CURRENT,
  LessonsActionType.LOAD_MORE_LESSONS,
] as const;

const actions = {
  ...authActions,
  ...profileActions,
  ...racingActions,
  ...settingsActions,
  ...lessonsActions,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyAsyncThunk = AsyncThunk<any, any, AsyncThunkOptions>;

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
