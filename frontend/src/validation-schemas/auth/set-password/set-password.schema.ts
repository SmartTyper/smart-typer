import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';
import { passwordSchema } from 'validation-schemas/fields/fields';

const setPasswordSchema = yup
  .object()
  .shape({
    password: passwordSchema.required(),
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
