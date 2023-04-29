import { Button, Form, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ReactMultiEmail, isEmail } from 'react-multi-email';

import { AppRoute } from 'common/enums/enums';
import { Link } from 'components/common/common';
import { useState } from 'hooks/hooks';
import { roomApi } from 'services/services';
import { getAllowedClasses } from 'helpers/helpers';

import styles from './styles.module.scss';
import 'react-multi-email/style.css';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  link: AppRoute;
  shareLink: string;
};

const ShareRoomModal: React.FC<Props> = ({
  isVisible,
  onClose,
  link,
  shareLink,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isSendDisabled, setSendDisabled] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const shareByEmail = async (): Promise<void> => {
    setSendDisabled(true);
    try {
      await roomApi.sendLinkByEmails({
        emails,
        link: shareLink,
      });
      toast.info(ToastMessage.SHARED_LINK_SENT);
    } catch (err) {
      const httpError = err as HttpError;
      toast.error(httpError.message);
    }
    setSendDisabled(false);
  };

  const handleEmailsInputChange = (emails: string[]): void => {
    setEmails(emails);
  };

  const checkIsEmail = (email: string): boolean => {
    return isEmail(email);
  };

  const getLabel = (
    email: string,
    index: number,
    removeEmail: (index: number) => void,
  ): JSX.Element => {
    const onClick = (): void => removeEmail(index);
    return (
      <div data-tag key={index}>
        {email}
        <span data-tag-handle onClick={onClick}>
          ×
        </span>
      </div>
    );
  };

  return (
    <Modal
      className="d-flex align-items-center"
      dialogClassName="w-50 rounded"
      show={isVisible}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title className={getAllowedClasses('m-0', styles.title)}>
          Share Room
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center">
          <div>
            <Form.Label>Link</Form.Label>
            <InputGroup className="mb-3" style={{ width: '30rem' }}>
              <FormControl
                value={shareLink}
                aria-label="Link to share"
                readOnly
              />
              <Button
                variant="success"
                onClick={(): void => {
                  navigator.clipboard.writeText(shareLink);
                  setIsCopied(true);
                }}
              >
                <i
                  className={isCopied ? 'bi bi-check2' : 'bi bi-clipboard'}
                  style={{ color: 'white' }}
                ></i>
              </Button>
            </InputGroup>
          </div>
          <div className={getAllowedClasses(styles.emailContainer)}>
            <Form.Label>Share by email</Form.Label>
            <div className="d-flex flex-column align-items-center">
              <ReactMultiEmail
                placeholder="Enter emails to which you want send link"
                emails={emails}
                className={getAllowedClasses(styles.emailsInput)}
                onChange={handleEmailsInputChange}
                validateEmail={checkIsEmail}
                getLabel={getLabel}
              />
              <Button
                variant="success"
                onClick={shareByEmail}
                className={getAllowedClasses(styles.sendButton)}
                disabled={isSendDisabled}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Link to={link}>
          <Button variant="success" disabled={isSendDisabled}>
            Go to room
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export { ShareRoomModal };
