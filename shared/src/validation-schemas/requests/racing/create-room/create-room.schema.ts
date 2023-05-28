import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';
import {
  MAX_ROOM_NAME_LENGTH,
  MIN_ROOM_NAME_LENGTH,
} from 'common/constants/constants';

const createRoomSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .trim()
      .min(MIN_ROOM_NAME_LENGTH)
      .max(MAX_ROOM_NAME_LENGTH)
      .required(),
    isPrivate: yup.boolean().required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { createRoomSchema };
