import { FormFieldLabel, FormFieldType } from 'common/enums/enums';
import {
  CreateRoomRequestDto,
  FC,
  VoidAction,
  VoidCallback,
} from 'common/types/types';
import { roomSchema } from 'validation-schemas/validation-schemas';
import { FormField } from 'components/common/common';
import { Modal } from 'components/common/common';
import { useForm, useSelector } from 'hooks/hooks';

type Props = {
  isVisible: boolean;
  onClose: VoidAction;
  onSubmit: VoidCallback<CreateRoomRequestDto>;
};

const CreateRoomModal: FC<Props> = ({ isVisible, onClose, onSubmit }) => {
  const { racingCreateRoom: isSubmitting } = useSelector(
    (state) => state.request,
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateRoomRequestDto>(roomSchema);

  return (
    <Modal
      className="d-flex align-items-center"
      isVisible={isVisible}
      cancelButton={{
        label: 'Cancel',
        isDisabled: isSubmitting,
        onClick: onClose,
      }}
      submitButton={{
        label: 'Submit',
        isDisabled: isSubmitting,
        onClick: handleSubmit(onSubmit),
      }}
      title="Create new room"
    >
      <FormField
        label={FormFieldLabel.ROOM_NAME}
        type={FormFieldType.TEXT}
        placeholder="Enter room name"
        register={register('name')}
        error={errors.name}
      />
      <FormField
        type={FormFieldType.CHECKBOX}
        register={register('isPrivate')}
        label={FormFieldLabel.IS_PRIVATE}
      />
    </Modal>
  );
};

export { CreateRoomModal };
