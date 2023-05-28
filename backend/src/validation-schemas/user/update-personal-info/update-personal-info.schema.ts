import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';
import { emailSchema, nicknameSchema } from 'validation-schemas/fields/fields';

const updatePersonalInfoSchema = yup
  .object()
  .shape({
    nickname: nicknameSchema,
    email: emailSchema,
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { updatePersonalInfoSchema };
