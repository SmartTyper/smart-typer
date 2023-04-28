import { Button, Form, Modal } from 'react-bootstrap';
import { useState, useForm, yupResolver } from 'hooks';
import { roomSchema } from 'common/validations';
import { IRoomCreation } from 'common/interfaces';
import { FieldType } from 'common/enums';
import { FormField } from 'components/common';
import { RBModal } from 'components/external/external';
import { SyntheticEvent, VoidCallback } from 'common/types/types';

type Props = {
  isVisible: boolean;
  isSubmitDisabled: boolean;
  onClose: VoidCallback<>;
  onSubmit: VoidCallback<SyntheticEvent>;
};

const Modal: React.FC<Props> = ({ isVisible, onClose, handleFunction }) => {
  return (
    <RBModal
      className="d-flex align-items-center"
      dialogClassName="w-50 rounded"
      show={isVisible}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <RBModal.Header closeButton>
        <RBModal.Title className="fs-6">Create new room:</RBModal.Title>
      </RBModal.Header>
      <RBModal.Body className="mx-0">
        <FormField
          label="Name"
          type={FieldType.TEXT}
          name="name"
          placeholder="Enter a room name"
          controlId="roomName"
          register={register('name')}
          errors={errors.name}
        />
        <Form.Check
          type={FieldType.CHECKBOX}
          id="default-checkbox"
          checked={checkedIsPrivate}
          onChange={handleCheck}
          name="isPrivateCheckBox"
          label="Private"
        />
      </RBModal.Body>
      <RBModal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          disabled={isSubmitDisabled}
          className="me-2"
        >
          Cancel
        </Button>

        <Button
          variant="success"
          onClick={handleSubmit(handleSubmitForm)}
          disabled={isSubmitDisabled}
        >
          Save
        </Button>
      </RBModal.Footer>
    </RBModal>
  );
};

export { Modal };
