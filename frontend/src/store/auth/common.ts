enum AuthActionType {
  LOG_IN = 'auth/logIn',
  REGISTER = 'auth/register',
  LOGOUT = 'auth/logout',
  LOG_IN_GOOGLE = 'auth/logInGoogle',
  LOAD_USER = 'auth/loadUser',
  SET_USER_NOT_EXISTS_ERROR = 'auth/setUserNotExistsError',
}

export { AuthActionType };
