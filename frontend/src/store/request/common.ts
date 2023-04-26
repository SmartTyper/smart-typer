import { authActions } from 'store/actions';
import { AuthActionType } from 'store/common';

const { logIn, register, logInGoogle, logOut } = authActions;

const STARTED_ACTIONS = [
  logIn.pending,
  register.pending,
  logInGoogle.pending,
  logOut.pending,
];
const FINISHED_ACTIONS = [
  logIn.fulfilled,
  register.fulfilled,
  logInGoogle.fulfilled,
  logOut.fulfilled,
  logIn.rejected,
  register.rejected,
  logInGoogle.rejected,
  logOut.rejected,
];

const REQUEST_ACTIONS_TYPES = [
  AuthActionType.LOG_IN,
  AuthActionType.REGISTER,
  AuthActionType.LOG_OUT,
  AuthActionType.LOG_IN_GOOGLE,
];

export { STARTED_ACTIONS, FINISHED_ACTIONS, REQUEST_ACTIONS_TYPES };
