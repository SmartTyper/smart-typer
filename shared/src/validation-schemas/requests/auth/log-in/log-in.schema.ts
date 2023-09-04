import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';
import { emailSchema, passwordSchema } from 'validation-schemas/fields/fields';

const logInSchema = yup
  .object()
  .shape({
    email: emailSchema.required(),
    password: passwordSchema.required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { logInSchema };
