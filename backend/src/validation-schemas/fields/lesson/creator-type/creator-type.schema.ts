import { yup } from 'dependencies/dependencies';
import { CreatorType, ValidationErrorMessage } from 'common/enums/enums';

const creatorTypeSchema = yup
  .string()
  .trim()
  .oneOf(
    Object.values(CreatorType),
    ValidationErrorMessage.INVALID_CONTENT_TYPE,
  );

export { creatorTypeSchema };
