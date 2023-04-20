enum ValidationErrorMessage {
  INVALID_KEYS_RECEIVED = 'Invalid keys received',
  // eslint-disable-next-line max-len
  FULL_NAME_INCLUSIONS = 'full name must consist of latin or cyrillic letters (upper and lower case), numbers, and symbols',
  // eslint-disable-next-line max-len
  PASSWORD_INCLUSIONS = 'password must consist of latin or cyrillic letters (upper and lower case), numbers, and symbols',
  FULL_MIN_LENGTH = 'full name must be at least 5 characters',
  FULL_MAX_LENGTH = 'full name must be at most 30 characters',
  PASSWORD_MIN_LENGTH = 'password must be at least 6 characters',
  PASSWORD_MAX_LENGTH = 'password must be at most 12 characters',
}

export { ValidationErrorMessage };
