import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';
import {
  emailSchema,
  nicknameSchema,
  passwordSchema,
} from 'validation-schemas/fields/fields';

const signUpSchema = yup
  .object()
  .shape({
    nickname: nicknameSchema.required(),
    email: emailSchema.required(),
    password: passwordSchema.required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { signUpSchema };
