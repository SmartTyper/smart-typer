import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';

const refreshTokensBodySchema = yup
  .object()
  .shape({
    refreshToken: yup.string().required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { refreshTokensBodySchema };
