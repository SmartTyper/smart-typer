import { yup } from 'dependencies/dependencies';
import { ContentType, ValidationErrorMessage } from 'common/enums/enums';

const creatorTypeSchema = yup
  .string()
  .trim()
  .oneOf(
    Object.values(ContentType),
    ValidationErrorMessage.INVALID_CONTENT_TYPE,
  );

export { creatorTypeSchema };
