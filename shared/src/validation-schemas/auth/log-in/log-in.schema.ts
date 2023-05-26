import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';

export const logInSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);
