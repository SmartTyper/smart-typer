enum HttpErrorMessage {
  NO_SUCH_EMAIL = 'That address is either invalid or is not associated with a user account',
  EMAIL_ALREADY_EXISTS = 'User with such email already exists',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  INVALID_TOKEN = 'Invalid token',
  UNAUTHORIZED = 'Unauthorized',
  NO_USER_WITH_SUCH_ID = 'User with such id does not exist',
  NO_ROOM_WITH_SUCH_ID = 'Room with such id does not exist',
  ROOM_ALREADY_EXISTS = 'Room with such name already exists',
  MAX_COUNT_OF_USERS = 'Room has max count of users',
  // prettier-ignore
  JOIN_PERSONAL_ROOM = 'You can\'t join another user\'s personal room',
  INVALID_LOG_IN_DATA = 'Incorrect email or password',
  INVALID_FILE_TYPE = 'Invalid file type',
  NO_FILE = 'No file was added',
}

export { HttpErrorMessage };
