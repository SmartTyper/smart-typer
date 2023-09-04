import { yup } from 'dependencies/dependencies';
import {
  MAX_NICKNAME_LENGTH,
  MIN_NICKNAME_LENGTH,
} from 'common/constants/constants';
import { ValidationErrorMessage } from 'common/enums/enums';
import { nicknameRegex } from 'validation-schemas/regex/regex';

const nicknameSchema = yup
  .string()
  .trim()
  .min(MIN_NICKNAME_LENGTH)
  .max(MAX_NICKNAME_LENGTH)
  .matches(nicknameRegex, ValidationErrorMessage.NICKNAME_INCLUSIONS);

export { nicknameSchema };
