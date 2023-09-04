import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';

const getUserProfileInfoParamsSchema = yup
  .object()
  .shape({
    userId: yup.number().required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { getUserProfileInfoParamsSchema };
