import * as yup from 'yup';
import { ValidationErrorMessage } from 'common/enums/enums';

const logInGoogleSchema = yup
  .object()
  .shape({
    code: yup.string().required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { logInGoogleSchema };