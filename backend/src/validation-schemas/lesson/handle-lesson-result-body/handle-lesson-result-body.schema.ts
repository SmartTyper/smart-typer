import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';

const handleLessonResultBodySchema = yup
  .object()
  .shape({
    misclicks: yup.array(yup.boolean()).required(),
    timestamps: yup.array(yup.number()).required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { handleLessonResultBodySchema };
