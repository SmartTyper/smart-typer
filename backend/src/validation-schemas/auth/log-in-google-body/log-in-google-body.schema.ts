import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';

const logInGoogleBodySchema = yup
  .object()
  .shape({
    code: yup.string().required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { logInGoogleBodySchema };
