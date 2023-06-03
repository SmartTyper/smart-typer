import {
  AppRoute,
  FormFieldLabel,
  FormFieldType,
  ShareUrlKey,
} from 'common/enums/enums';
import {
  FC,
  SendRoomUrlToEmailsRequestDto,
  ShareRoomUrlDto,
  VoidAction,
  VoidCallback,
} from 'common/types/types';
import { replaceRouteIdParam } from 'helpers/helpers';
import { useNavigate, useDispatch, useSelector, useForm } from 'hooks/hooks';
import { Button, FormField, Modal } from 'components/common/common';
import { ReactMultiEmail } from 'components/external/external';
import { validateReactMultiEmail } from 'helpers/helpers';
import { racing as racingActions } from 'store/modules/actions';
import { sendShareRoomUrlSchema } from 'validation-schemas/validation-schemas';

import 'react-multi-email/dist/style.css';
import styles from './styles.module.scss';

type Props = {
  isVisible: boolean;
  onClose: VoidAction;
  shareRoomUrl: ShareRoomUrlDto[ShareUrlKey.URL];
};

type Emails = SendRoomUrlToEmailsRequestDto[ShareUrlKey.EMAILS];

const ShareRoomModal: FC<Props> = ({ isVisible, onClose, shareRoomUrl }) => {
  const { racingSendRoomUrlToEmails: isRoomUrlSending } = useSelector(
    (state) => state.requests,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SendRoomUrlToEmailsRequestDto>(sendShareRoomUrlSchema, {
    [ShareUrlKey.URL]: shareRoomUrl,
  });

  const emails = watch(ShareUrlKey.EMAILS);

  const handleSend = (data: SendRoomUrlToEmailsRequestDto): void => {
    dispatch(racingActions.sendRoomUrlToEmails(data));
  };

  const handleGetLabel = (
    email: Emails[number],
    index: number,
    removeEmail: VoidCallback<number>,
  ): JSX.Element => {
    const onClick = (): void => removeEmail(index);
    return (
      <div data-tag key={index}>
        {email}
        <span data-tag-handle onClick={onClick}>
          x
        </span>
      </div>
    );
  };

  const handleGoToCreatedRoom = (): void => {
    const shareRoomId = Number(shareRoomUrl.split('/').pop());
    const route = replaceRouteIdParam(AppRoute.ROOMS_$ID, shareRoomId);
    navigate(route);
  };

  const handleEmailsInputChange = (emails: Emails): void => {
    setValue(ShareUrlKey.EMAILS, emails);
  };

  return (
    <Modal
      isVisible={isVisible}
      cancelButton={{
        label: 'Cancel',
        isDisabled: isRoomUrlSending,
        onClick: onClose,
      }}
      submitButton={{
        label: 'Go to room',
        isDisabled: isRoomUrlSending,
        onClick: handleGoToCreatedRoom,
      }}
      title="Share room"
    >
      <FormField
        value={shareRoomUrl}
        label={FormFieldLabel.LINK_TO_SHARE}
        readOnly
        hasCopyButton
        type={FormFieldType.TEXT}
        className={styles.shareRoomUrlField}
      />
      <FormField
        label={FormFieldLabel.EMAILS}
        type={FormFieldType.CUSTOM}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        error={errors.emails}
      >
        <ReactMultiEmail
          placeholder="Enter emails which you want to send link to"
          emails={emails}
          className={styles.emailsInput}
          onChange={handleEmailsInputChange}
          validateEmail={validateReactMultiEmail}
          getLabel={handleGetLabel}
        />
      </FormField>
      <Button
        onClick={handleSubmit(handleSend)}
        className={styles.sendButton}
        isDisabled={isRoomUrlSending}
        label="Send"
      />
    </Modal>
  );
};

export { ShareRoomModal };
