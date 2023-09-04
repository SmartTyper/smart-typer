import { yup } from 'dependencies/dependencies';

import { ValidationErrorMessage } from 'common/enums/enums';
import { passwordSchema } from 'validation-schemas/fields/fields';

const setPasswordBodySchema = yup
  .object()
  .shape({
    password: passwordSchema.required(),
    token: yup.string().required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { setPasswordBodySchema };
