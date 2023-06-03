import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';
import {
  MAX_LESSON_CONTENT_LENGTH,
  MAX_LESSON_NAME_LENGTH,
  MIN_LESSON_CONTENT_LENGTH,
  MIN_LESSON_NAME_LENGTH,
  TEST_LESSON_NAMES,
} from 'common/constants/constants';
import { contentTypeSchema } from 'validation-schemas/fields/fields';

const createLessonSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .trim()
      .min(MIN_LESSON_NAME_LENGTH)
      .max(MAX_LESSON_NAME_LENGTH)
      .notOneOf(TEST_LESSON_NAMES, ValidationErrorMessage.INVALID_LESSON_NAME)
      .required(),
    content: yup
      .string()
      .trim()
      .min(MIN_LESSON_CONTENT_LENGTH)
      .max(MAX_LESSON_CONTENT_LENGTH)
      .required(),
    contentType: contentTypeSchema.required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { createLessonSchema };
