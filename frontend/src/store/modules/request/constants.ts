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

const { logIn, register, logInGoogle, logOut, setPassword, resetPassword } =
  authActions;
const { deleteAvatar, updateInfo, updateAvatar } = profileActions;
const { loadAvailableRooms, createRoom, sendRoomUrlToEmails } = racingActions;
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
  setPassword.pending,
  resetPassword.pending,
  createRoom.pending,
  sendRoomUrlToEmails.pending,
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
  setPassword.fulfilled,
  resetPassword.fulfilled,
  createRoom.fulfilled,
  sendRoomUrlToEmails.fulfilled,

  logIn.rejected,
  register.rejected,
  logInGoogle.rejected,
  logOut.rejected,
  deleteAvatar.rejected,
  updateInfo.rejected,
  updateAvatar.rejected,
  loadAvailableRooms.rejected,
  update.rejected,
  setPassword.rejected,
  resetPassword.rejected,
  createRoom.rejected,
  sendRoomUrlToEmails.rejected,
];

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

export { STARTED_ACTIONS, FINISHED_ACTIONS, REQUEST_ACTIONS_TYPES };
