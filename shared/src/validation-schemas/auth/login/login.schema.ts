import * as yup from 'yup';
import { ValidationErrorMessage } from 'common/enums/enums';

export const loginSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);
