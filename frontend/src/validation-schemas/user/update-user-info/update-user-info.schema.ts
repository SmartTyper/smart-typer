import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';
import { emailSchema, nicknameSchema } from 'validation-schemas/fields/fields';

const updateUserInfoSchema = yup
  .object()
  .shape({
    nickname: nicknameSchema.required(),
    email: emailSchema.required(),
    photoUrl: yup.string().nullable(true),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { updateUserInfoSchema };
