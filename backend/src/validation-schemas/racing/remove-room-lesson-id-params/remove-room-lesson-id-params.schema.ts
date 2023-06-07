import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';
import { roomIdSchema } from 'validation-schemas/fields/fields';

const removeRoomLessonIdParamsSchema = yup
  .object()
  .shape({
    roomId: roomIdSchema.required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { removeRoomLessonIdParamsSchema };