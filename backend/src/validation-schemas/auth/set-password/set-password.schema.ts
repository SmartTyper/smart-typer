import { yup } from 'dependencies/dependencies';
import { passwordSchema as baseSetPasswordSchema } from 'smart-typer-shared/validation-schemas/validation-schemas';
import { ValidationErrorMessage } from 'common/enums/enums';

const setPasswordSchema = baseSetPasswordSchema
  .shape({
    token: yup.string().required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { setPasswordSchema };
