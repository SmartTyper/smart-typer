enum ValidationErrorMessage {
  INVALID_KEYS_RECEIVED = 'Invalid keys received',
  // eslint-disable-next-line max-len
  NICKNAME_INCLUSIONS = 'nickname must consist of latin or cyrillic letters (upper and lower case), numbers, and symbols',
  // eslint-disable-next-line max-len
  PASSWORD_INCLUSIONS = 'password must consist of latin or cyrillic letters (upper and lower case), numbers, and symbols',
  NICKNAME_MIN_LENGTH = 'nickname must be at least 5 characters',
  NICKNAME_MAX_LENGTH = 'nickname must be at most 30 characters',
  PASSWORD_MIN_LENGTH = 'password must be at least 6 characters',
  PASSWORD_MAX_LENGTH = 'password must be at most 12 characters',
  PASSWORDS_MUST_MATCH = 'passwords must match',
  INVALID_FILE_SIZE = 'File must be less than 5 Mb.',
  FORBIDDEN_FILE_TYPE = 'Forbidden file type. Please choose image with type .png, .jpg or .jpeg',
  LESSON_NAME_MIN_LENGTH = 'lesson\'s name must be at least 3 characters',
  LESSON_NAME_MAX_LENGTH = 'lesson\'s name must be at most 15 characters',
  INVALID_LESSON_NAME = 'lesson\'s name must not include \'System Test Lesson\' ',
  INVALID_CONTENT_TYPE = 'lesson\'s content type must be one of: symbols, words, sentences',
  LESSON_CONTENT_MIN_LENGTH = 'lesson\'s content must be at least 20 characters',
  LESSON_CONTENT_MAX_LENGTH = 'lesson\'s content must be at most 1500 characters',
}

export { ValidationErrorMessage };
