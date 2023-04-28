import { RBModal } from 'components/external/external';
import { ModalButton } from 'common/types/types';
import { Button } from '../button/button';

type Props = {
  children: JSX.Element;
  isVisible: boolean;
  submitButton?: ModalButton;
  cancelButton?: ModalButton;
  title?: string;
};

const Modal: React.FC<Props> = ({ children, isVisible, submitButton,  cancelButton, title }) => {
  const hasHeader = Boolean(title);
  const hasFooter = cancelButton || submitButton;
  return (
    <RBModal
      className="d-flex align-items-center"
      dialogClassName="w-50 rounded"
      show={isVisible}
      onHide={cancelButton?.onClick}
      backdrop="static"
      keyboard={false}
    >
      {hasHeader &&<RBModal.Header closeButton>
        <RBModal.Title className="fs-6">Create new room:</RBModal.Title>
      </RBModal.Header>
      }
      <RBModal.Body className="mx-0">
        {children}
      </RBModal.Body>
      {hasFooter  && <RBModal.Footer>
        {cancelButton && <Button
          onClick={cancelButton.onClick}
          isDisabled={cancelButton.isDisabled}
          className="me-2"
        >
          {cancelButton.label}
        </Button>}
        {submitButton && <Button
          onClick={submitButton.onClick}
          isDisabled={submitButton.isDisabled}
          className="me-2"
        >
          {submitButton.label}
        </Button>}
      </RBModal.Footer>}
    </RBModal>
  );
};

export { Modal };
