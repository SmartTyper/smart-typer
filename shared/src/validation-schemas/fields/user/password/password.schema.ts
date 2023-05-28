import { yup } from 'dependencies/dependencies';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from 'common/constants/constants';
import { ValidationErrorMessage } from 'common/enums/enums';
import { passwordRegex } from 'validation-schemas/regex/regex';

const passwordSchema = yup
  .string()
  .min(MIN_PASSWORD_LENGTH, ValidationErrorMessage.PASSWORD_MIN_LENGTH)
  .max(MAX_PASSWORD_LENGTH, ValidationErrorMessage.PASSWORD_MAX_LENGTH)
  .matches(passwordRegex, ValidationErrorMessage.PASSWORD_INCLUSIONS);

export { passwordSchema };
