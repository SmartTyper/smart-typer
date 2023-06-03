import { ContentType, ValidationErrorMessage } from 'common/enums/enums';
import { yup } from 'dependencies/dependencies';

const contentTypeSchema = yup
  .string()
  .trim()
  .oneOf(
    Object.values(ContentType),
    ValidationErrorMessage.INVALID_CONTENT_TYPE,
  );

export { contentTypeSchema };
