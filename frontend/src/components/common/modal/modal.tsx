import { RBModal } from 'components/external/external';
import { FC, ModalButton } from 'common/types/types';
import { Button } from 'components/common/common';
import { clsx } from 'helpers/helpers';

type Props = {
  children: JSX.Element | JSX.Element[];
  isVisible: boolean;
  submitButton?: ModalButton;
  cancelButton?: ModalButton;
  title?: string;
  className?: string;
  // size
};

const Modal: FC<Props> = ({
  children,
  isVisible,
  submitButton,
  cancelButton,
  title,
  className,
}) => {
  const hasHeader = Boolean(title);
  const hasFooter = cancelButton || submitButton;
  return (
    <RBModal
      className={clsx('d-flex align-items-center', className)}
      dialogClassName="w-50 rounded"
      show={isVisible}
      onHide={cancelButton?.onClick}
      backdrop="static"
      keyboard={false}
    >
      {hasHeader && (
        <RBModal.Header closeButton>
          <RBModal.Title className="fs-6">{title}</RBModal.Title>
        </RBModal.Header>
      )}
      <RBModal.Body className="mx-0">{children}</RBModal.Body>
      {hasFooter && (
        <RBModal.Footer>
          {cancelButton && (
            <Button
              onClick={cancelButton.onClick}
              isDisabled={cancelButton.isDisabled}
              className="me-2"
            >
              {cancelButton.label}
            </Button>
          )}
          {submitButton && (
            <Button
              onClick={submitButton.onClick}
              isDisabled={submitButton.isDisabled}
              className="me-2"
            >
              {submitButton.label}
            </Button>
          )}
        </RBModal.Footer>
      )}
    </RBModal>
  );
};

export { Modal };