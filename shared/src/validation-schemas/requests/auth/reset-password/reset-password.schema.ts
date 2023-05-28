import { ValidationErrorMessage } from 'common/enums/enums';
import { yup } from 'dependencies/dependencies';
import { emailSchema } from 'validation-schemas/fields/fields';

const resetPasswordSchema = yup
  .object()
  .shape({
    email: emailSchema.required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { resetPasswordSchema };
