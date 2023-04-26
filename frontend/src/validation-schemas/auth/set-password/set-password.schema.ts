import * as yup from 'yup';
import { passwordSchema as baseSetPasswordSchema } from 'smart-typer-shared/validation-schemas/validation-schemas';
import { ValidationErrorMessage } from 'common/enums/enums';

const setPasswordSchema = baseSetPasswordSchema
  .shape({
    passwordRepeat: yup
      .string()
      .required()
      .oneOf(
        [yup.ref('password'), null],
        ValidationErrorMessage.PASSWORDS_MUST_MATCH,
      ),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { setPasswordSchema };
