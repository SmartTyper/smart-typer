enum AppRoute {
  ROOT = '/',
  LOG_IN = '/log-in',
  LOG_IN_GOOGLE = '/log-in-google',
  SIGN_UP = '/sign-up',
  THEORY = '/theory',
  LESSONS = '/lessons',
  LESSON_$ID = '/lessons/:id',
  STUDY_PLAN = '/study-plan',
  RACING = '/racing',
  ROOMS = '/rooms',
  ROOMS_$ID = '/rooms/:id',
  USERS_$ID_PROFILE = 'users/:id/profile',
  SETTINGS = '/settings',
  RESET_PASSWORD = '/reset-password',
  SET_PASSWORD = '/set-password',
}

export { AppRoute };
