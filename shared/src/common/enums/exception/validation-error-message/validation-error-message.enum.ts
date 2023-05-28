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
}

export { ValidationErrorMessage };
