import { authActions } from 'store/actions';
import { AuthActionType } from 'store/common';

const { login, register, loginGoogle, logout } = authActions;

const STARTED_ACTIONS = [
  login.pending,
  register.pending,
  loginGoogle.pending,
  logout.pending,
];
const FINISHED_ACTIONS = [
  login.fulfilled,
  register.fulfilled,
  loginGoogle.fulfilled,
  logout.fulfilled,
  login.rejected,
  register.rejected,
  loginGoogle.rejected,
  logout.rejected,
];

const REQUEST_ACTIONS_TYPES = [
  AuthActionType.LOGIN,
  AuthActionType.REGISTER,
  AuthActionType.LOGOUT,
  AuthActionType.LOGIN_GOOGLE,
];

export { STARTED_ACTIONS, FINISHED_ACTIONS, REQUEST_ACTIONS_TYPES };
