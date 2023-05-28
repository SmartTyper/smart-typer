import {
  ContentWrapperSize,
  FormFieldLabel,
  FormFieldType,
} from 'common/enums/enums';
import { FC, SettingsDto } from 'common/types/types';
import { Button, ContentWrapper, FormField } from 'components/common/common';
import { useSelector, useForm, useDispatch } from 'hooks/hooks';
import { updateSettingsSchema } from 'validation-schemas/validation-schemas';
import { settings as settingsActions } from 'store/modules/actions';
import { RBForm } from 'components/external/external';
import { Card } from './components/components';
import { CardHeaderColor } from './common/enums/enums';

import styles from './styles.module.scss';

const Settings: FC = () => {
  const dispatch = useDispatch();
  const {
    gameTime,
    countdownBeforeGame,
    hasEmailNotifications,
    isShownInRating,
    isSoundTurnedOn,
    isUpdateLoading,
  } = useSelector(({ settings, requests }) => ({
    gameTime: settings.gameTime,
    countdownBeforeGame: settings.countdownBeforeGame,
    hasEmailNotifications: settings.hasEmailNotifications,
    isShownInRating: settings.isShownInRating,
    isSoundTurnedOn: settings.isShownInRating,
    isUpdateLoading: requests.settingsUpdate,
  }));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsDto>(updateSettingsSchema);

  const handleSubmitForm = (data: SettingsDto): void => {
    dispatch(settingsActions.update(data));
  };

  return (
    <ContentWrapper size={ContentWrapperSize.LARGE} className={styles.settings}>
      <h2>Customize your experience</h2>
      <RBForm className={styles.form}>
        <div className={styles.cards}>
          <Card title="Notifications" color={CardHeaderColor.YELLOW}>
            <FormField
              label={FormFieldLabel.HAS_EMAIL_NOTIFICATIONS}
              type={FormFieldType.CHECKBOX}
              register={register('hasEmailNotifications')}
              error={errors.hasEmailNotifications}
              defaultChecked={hasEmailNotifications}
            />
          </Card>
          <Card title="Security" color={CardHeaderColor.ORANGE}>
            <FormField
              label={FormFieldLabel.IS_SHOWN_IN_RATING}
              type={FormFieldType.CHECKBOX}
              register={register('isShownInRating')}
              error={errors.isShownInRating}
              defaultChecked={isShownInRating}
            />
          </Card>
          <Card title="Sound effects" color={CardHeaderColor.PINK}>
            <FormField
              label={FormFieldLabel.IS_SOUND_TURNED_ON}
              type={FormFieldType.CHECKBOX}
              register={register('isSoundTurnedOn')}
              error={errors.isSoundTurnedOn}
              defaultChecked={isSoundTurnedOn}
            />
          </Card>
          <Card title="Racing" color={CardHeaderColor.BLUE}>
            <FormField
              label={FormFieldLabel.GAME_TIME}
              type={FormFieldType.NUMBER}
              register={register('gameTime')}
              error={errors.gameTime}
              defaultValue={gameTime}
              inputClassName={styles.racingField}
              note={<span>* only for the single player mode</span>}
            />
          </Card>
          <Card title="Racing" color={CardHeaderColor.BLUE}>
            <FormField
              label={FormFieldLabel.COUNTDOWN_BEFORE_GAME}
              type={FormFieldType.NUMBER}
              register={register('countdownBeforeGame')}
              error={errors.countdownBeforeGame}
              defaultValue={countdownBeforeGame}
              inputClassName={styles.racingField}
              note={<span>* only for the single player mode</span>}
            />
          </Card>
        </div>
        <Button
          onClick={handleSubmit(handleSubmitForm)}
          label="Apply"
          isLoading={isUpdateLoading}
          className={styles.submitButton}
        />
      </RBForm>
    </ContentWrapper>
  );
};

export { Settings };
