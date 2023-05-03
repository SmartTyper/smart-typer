import { AppRoute, FormFieldLabel, FormFieldType } from 'common/enums/enums';
import {
  FC,
  SendRoomUrlToEmailsRequestDto,
  ShareRoomUrlDto,
  VoidAction,
  VoidCallback,
} from 'common/types/types';
import { clsx, replaceRouteIdParam } from 'helpers/helpers';
import { useNavigate, useState, useDispatch, useSelector } from 'hooks/hooks';
import { Button, FormField, Modal } from 'components/common/common';
import {
  RBForm,
  RBInputGroup,
  ReactMultiEmail,
} from 'components/external/external';
import { validateReactMultiEmail } from 'helpers/helpers';
import { racing as racingActions } from 'store/modules/actions';

import 'react-multi-email/style.css';
import styles from './styles.module.scss';

type Props = {
  isVisible: boolean;
  onClose: VoidAction;
  shareRoomUrl: ShareRoomUrlDto['url'];
};

type Emails = SendRoomUrlToEmailsRequestDto['emails'];

const ShareRoomModal: FC<Props> = ({ isVisible, onClose, shareRoomUrl }) => {
  const { racingSendRoomUrlToEmails: isRoomUrlSending } = useSelector(
    (state) => state.requests,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCopied, setIsCopied] = useState(false);
  const [emails, setEmails] = useState<Emails>([]);

  const shareRoomId = Number(shareRoomUrl.split('/').pop());

  const handleSend = (): void => {
    dispatch(
      racingActions.sendRoomUrlToEmails({
        emails,
        shareRoomUrl,
      }),
    );
  };

  const handleEmailsInputChange = (emails: Emails): void => {
    setEmails(emails);
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

  const handleCopy = (): void => {
    navigator.clipboard.writeText(shareRoomUrl);
    setIsCopied(true);
  };

  const handleGoToCreatedRoom = (): void => {
    const route = replaceRouteIdParam(AppRoute.ROOMS_$ID, shareRoomId);
    navigate(route);
  };

  return (
    <Modal
      className="d-flex align-items-center"
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
      <div className="d-flex flex-column align-items-center">
        <div>
          <RBForm.Label>Link</RBForm.Label>
          <RBInputGroup className="mb-3" style={{ width: '30rem' }}>
            <FormField
              value={shareRoomUrl}
              label={FormFieldLabel.LINK_TO_SHARE}
              readOnly
              type={FormFieldType.TEXT}
            />
            <Button onClick={handleCopy}>
              <i
                className={isCopied ? 'bi bi-check2' : 'bi bi-clipboard'}
                style={{ color: 'white' }}
              ></i>
            </Button>
          </RBInputGroup>
        </div>
        <div className={clsx(styles.emailContainer)}>
          <RBForm.Label>Share by email</RBForm.Label>
          <div className="d-flex flex-column align-items-center">
            <ReactMultiEmail
              placeholder="Enter emails which you want to send link to"
              emails={emails}
              className={styles.emailsInput}
              onChange={handleEmailsInputChange}
              validateEmail={validateReactMultiEmail}
              getLabel={handleGetLabel}
            />
            <Button
              onClick={handleSend}
              className={styles.sendButton}
              isDisabled={isRoomUrlSending}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { ShareRoomModal };
