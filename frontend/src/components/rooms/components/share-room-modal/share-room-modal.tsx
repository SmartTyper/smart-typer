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
import { clsx, replaceRouteIdParam } from 'helpers/helpers';
import {
  useNavigate,
  useDispatch,
  useForm,
  useState,
} from 'hooks/hooks';
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
  isRoomUrlSending: boolean;
};

type Emails = SendRoomUrlToEmailsRequestDto[ShareUrlKey.EMAILS];

const ShareRoomModal: FC<Props> = ({ isVisible, onClose, shareRoomUrl, isRoomUrlSending }) => {
  const [emailsInputFocused, setEmailsInputFocused] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleSubmit, setValue, watch } =
    useForm<SendRoomUrlToEmailsRequestDto>(sendShareRoomUrlSchema, {
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
      <div data-tag key={index} className={styles.email}>
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
    setValue(ShareUrlKey.EMAILS as keyof SendRoomUrlToEmailsRequestDto, emails);
  };

  const handleToggleEmailsInputFocus = (): void => {
    setEmailsInputFocused((prev) => !prev);
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
      className={styles.shareRoomModal}
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
        note={<span>* correctly entered emails are greyed out</span>}
      >
        <ReactMultiEmail
          placeholder="Enter emails which you want to send link to"
          emails={emails}
          className={clsx(
            styles.emailsInput,
            emailsInputFocused && styles.focused,
          )}
          onChange={handleEmailsInputChange}
          validateEmail={validateReactMultiEmail}
          getLabel={handleGetLabel}
          onFocus={handleToggleEmailsInputFocus}
          onBlur={handleToggleEmailsInputFocus}
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
