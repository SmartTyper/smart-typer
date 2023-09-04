import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';
import { emailSchema } from 'validation-schemas/fields/fields';
import {
  MAX_SHARE_ROOM_URL_LENGTH,
  MIN_SHARE_ROOM_URL_LENGTH,
} from 'common/constants/constants';

const sendShareRoomUrlSchema = yup
  .object()
  .shape({
    url: yup
      .string()
      .trim()
      .min(MIN_SHARE_ROOM_URL_LENGTH)
      .max(MAX_SHARE_ROOM_URL_LENGTH)
      .required(),
    emails: yup.array(emailSchema).required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { sendShareRoomUrlSchema };
