import { Button, Form, Modal } from 'react-bootstrap';
import { useState, useForm } from 'hooks/hooks';
import { roomSchema } from 'common/validations';
import { IRoomCreation } from 'common/interfaces';
import { RoomType, FieldType } from 'common/enums';
import { FormField } from 'components/common';

type Props = {
  showModal: boolean;
  onModalClose: () => void;
  handleFunction: (data: IRoomCreation) => void;
};

const CreateRoomModal: React.FC<Props> = ({
  showModal,
  onModalClose,
  handleFunction,
}) => {
  const [checkedIsPrivate, setCheckedIsPrivate] = useState(false);
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  const handleClose = (): void => {
    onModalClose();
    reset({ name: '' });
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Pick<IRoomCreation, 'name'>>(roomSchema);

  const handleSubmitForm = async ({
    name,
  }: Pick<IRoomCreation, 'name'>): Promise<void> => {
    setSubmitDisabled(true);
    handleFunction({
      name,
      type: checkedIsPrivate ? RoomType.PRIVATE : RoomType.PUBLIC,
    });
    onModalClose();

    setSubmitDisabled(false);
    reset({ name: '' });
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCheckedIsPrivate(e.target.checked);
  };

  return (
    <Modal
      className="d-flex align-items-center"
      dialogClassName="w-50 rounded"
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-6">Create new room:</Modal.Title>
      </Modal.Header>
      <Modal.Body className="mx-0">
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
      </Modal.Body>
      <Modal.Footer>
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
      </Modal.Footer>
    </Modal>
  );
};

export { CreateRoomModal };
