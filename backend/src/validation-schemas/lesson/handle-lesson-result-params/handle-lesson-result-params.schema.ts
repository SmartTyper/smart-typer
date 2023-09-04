import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';
import { lessonIdSchema } from 'validation-schemas/fields/fields';

const handleLessonResultParamsSchema = yup
  .object()
  .shape({
    lessonId: lessonIdSchema.required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { handleLessonResultParamsSchema };
