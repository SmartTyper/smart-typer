import { FormFieldLabel, FormFieldType, RoomKey } from 'common/enums/enums';
import {
  CreateRoomRequestDto,
  FC,
  VoidAction,
  VoidCallback,
} from 'common/types/types';
import { createRoomSchema } from 'validation-schemas/validation-schemas';
import { FormField } from 'components/common/common';
import { Modal } from 'components/common/common';
import { useForm } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  isVisible: boolean;
  onClose: VoidAction;
  onSubmit: VoidCallback<CreateRoomRequestDto>;
  isSubmitting: boolean;
};

const CreateRoomModal: FC<Props> = ({ isVisible, onClose, onSubmit, isSubmitting }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateRoomRequestDto>(createRoomSchema, {
    [RoomKey.IS_PRIVATE]: false,
  });

  return (
    <Modal
      isVisible={isVisible}
      cancelButton={{
        label: 'Cancel',
        isDisabled: isSubmitting,
        onClick: onClose,
      }}
      submitButton={{
        label: 'Save',
        isDisabled: isSubmitting,
        onClick: handleSubmit(onSubmit),
      }}
      title="Create new room"
      className={styles.createRoomModal}
    >
      <FormField
        label={FormFieldLabel.ROOM_NAME}
        type={FormFieldType.TEXT}
        placeholder="Enter room name"
        register={register(RoomKey.NAME)}
        error={errors.name}
      />
      <FormField
        type={FormFieldType.CHECKBOX}
        register={register(RoomKey.IS_PRIVATE)}
        label={FormFieldLabel.IS_PRIVATE}
      />
    </Modal>
  );
};

export { CreateRoomModal };
