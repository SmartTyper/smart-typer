import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';
import {
  contentTypeSchema,
  creatorTypeSchema,
} from 'validation-schemas/fields/fields';

const getMoreLessonsQuerySchema = yup
  .object()
  .shape({
    offset: yup.number().required(),
    limit: yup.number().required(),
    contentType: contentTypeSchema,
    creatorType: creatorTypeSchema,
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { getMoreLessonsQuerySchema };
