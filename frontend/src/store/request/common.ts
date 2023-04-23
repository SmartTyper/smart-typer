import { authActions } from 'store/actions';
import { AuthActionType } from 'store/common';

const { logIn, register, logInGoogle, logout } = authActions;

const STARTED_ACTIONS = [
  logIn.pending,
  register.pending,
  logInGoogle.pending,
  logout.pending,
];
const FINISHED_ACTIONS = [
  logIn.fulfilled,
  register.fulfilled,
  logInGoogle.fulfilled,
  logout.fulfilled,
  logIn.rejected,
  register.rejected,
  logInGoogle.rejected,
  logout.rejected,
];

const REQUEST_ACTIONS_TYPES = [
  AuthActionType.LOG_IN,
  AuthActionType.REGISTER,
  AuthActionType.LOGOUT,
  AuthActionType.LOG_IN_GOOGLE,
];

export { STARTED_ACTIONS, FINISHED_ACTIONS, REQUEST_ACTIONS_TYPES };
