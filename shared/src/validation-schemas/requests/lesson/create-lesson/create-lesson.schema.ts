import { yup } from 'dependencies/dependencies';
import { ContentType, ValidationErrorMessage } from 'common/enums/enums';
import {
  MAX_LESSON_CONTENT_LENGTH,
  MAX_LESSON_NAME_LENGTH,
  MIN_LESSON_CONTENT_LENGTH,
  MIN_LESSON_NAME_LENGTH,
  TEST_LESSON_NAMES,
} from 'common/constants/constants';

const createLessonSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .trim()
      .min(
        MIN_LESSON_NAME_LENGTH,
        ValidationErrorMessage.LESSON_NAME_MIN_LENGTH,
      )
      .max(
        MAX_LESSON_NAME_LENGTH,
        ValidationErrorMessage.LESSON_NAME_MAX_LENGTH,
      )
      .notOneOf(TEST_LESSON_NAMES, ValidationErrorMessage.INVALID_LESSON_NAME)
      .required(),
    content: yup
      .string()
      .trim()
      .min(
        MIN_LESSON_CONTENT_LENGTH,
        ValidationErrorMessage.LESSON_CONTENT_MIN_LENGTH,
      )
      .max(
        MAX_LESSON_CONTENT_LENGTH,
        ValidationErrorMessage.LESSON_CONTENT_MAX_LENGTH,
      )
      .required(),
    contentType: yup
      .string()
      .trim()
      .oneOf(
        Object.values(ContentType),
        ValidationErrorMessage.INVALID_CONTENT_TYPE,
      )
      .required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { createLessonSchema };
