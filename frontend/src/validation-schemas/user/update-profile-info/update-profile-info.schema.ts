import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';
import { emailSchema, nicknameSchema } from 'validation-schemas/fields/fields';

const updateProfileInfoSchema = yup
  .object()
  .shape({
    nickname: nicknameSchema.required(),
    email: emailSchema.required(),
    photoUrl: yup.string(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { updateProfileInfoSchema };
