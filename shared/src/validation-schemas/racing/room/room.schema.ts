import * as yup from 'yup';
import { ValidationErrorMessage } from 'common/enums/enums';

export const roomSchema = yup
  .object()
  .shape({
    name: yup.string().trim().min(2).max(50).required(),
    isPrivate: yup.boolean().required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);
