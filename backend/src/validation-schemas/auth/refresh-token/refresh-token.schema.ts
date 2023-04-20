import * as yup from 'yup';
import { ValidationErrorMessage } from 'common/enums/enums';

const refreshTokenSchema = yup
  .object()
  .shape({
    refreshToken: yup.string().required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { refreshTokenSchema };
