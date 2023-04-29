import {
  authActions,
  profileActions,
  racingActions,
  settingsActions,
} from 'store/actions';
import {
  AuthActionType,
  ProfileActionType,
  RacingActionType,
  SettingsActionType,
} from 'store/common';

const { logIn, register, logInGoogle, logOut } = authActions;
const { deleteAvatar, updateInfo, updateAvatar } = profileActions;
const { loadAvailableRooms } = racingActions;
const { update } = settingsActions;

const STARTED_ACTIONS = [
  logIn.pending,
  register.pending,
  logInGoogle.pending,
  logOut.pending,
  deleteAvatar.pending,
  updateInfo.pending,
  updateAvatar.pending,
  loadAvailableRooms.pending,
  update.pending,
];

const FINISHED_ACTIONS = [
  logIn.fulfilled,
  register.fulfilled,
  logInGoogle.fulfilled,
  logOut.fulfilled,
  deleteAvatar.fulfilled,
  updateInfo.fulfilled,
  updateAvatar.fulfilled,
  loadAvailableRooms.fulfilled,
  update.fulfilled,

  logIn.rejected,
  register.rejected,
  logInGoogle.rejected,
  logOut.rejected,
  deleteAvatar.rejected,
  updateInfo.rejected,
  updateAvatar.rejected,
  loadAvailableRooms.rejected,
  update.rejected,
];

const REQUEST_ACTIONS_TYPES = [
  AuthActionType.LOG_IN,
  AuthActionType.REGISTER,
  AuthActionType.LOG_OUT,
  AuthActionType.LOG_IN_GOOGLE,
  ProfileActionType.DELETE_AVATAR,
  ProfileActionType.UPDATE_AVATAR,
  ProfileActionType.UPDATE_INFO,
  RacingActionType.LOAD_AVAILABLE_ROOMS,
  SettingsActionType.UPDATE,
];

export { STARTED_ACTIONS, FINISHED_ACTIONS, REQUEST_ACTIONS_TYPES };
