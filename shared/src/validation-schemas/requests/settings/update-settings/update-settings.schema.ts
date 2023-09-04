import { yup } from 'dependencies/dependencies';
import { ValidationErrorMessage } from 'common/enums/enums';
import {
  MAX_COUNTDOWN_BEFORE_GAME,
  MAX_GAME_TIME,
  MIN_COUNTDOWN_BEFORE_GAME,
  MIN_GAME_TIME,
} from 'common/constants/constants';

const updateSettingsSchema = yup
  .object()
  .shape({
    countdownBeforeGame: yup
      .number()
      .min(MIN_COUNTDOWN_BEFORE_GAME)
      .max(MAX_COUNTDOWN_BEFORE_GAME),
    gameTime: yup.number().min(MIN_GAME_TIME).max(MAX_GAME_TIME),
    isShownInRating: yup.boolean(),
    isSoundTurnedOn: yup.boolean(),
    hasEmailNotifications: yup.boolean(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { updateSettingsSchema };
