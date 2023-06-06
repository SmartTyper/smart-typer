import {
  ContentType,
  FormFieldLabel,
  FormFieldType,
  LessonKey,
} from 'common/enums/enums';
import {
  CreateLessonRequestDto,
  FC,
  VoidAction,
  VoidCallback,
} from 'common/types/types';
import { createLessonSchema } from 'validation-schemas/validation-schemas';
import { FormField, Select } from 'components/common/common';
import { Modal } from 'components/common/common';
import { useForm } from 'hooks/hooks';
import { CONTENT_TYPE_OPTIONS as CONTENT_TYPE_OPTIONS_WITH_ALL } from 'components/lessons/common/constants/constants';

import styles from './styles.module.scss';
import { IOption } from 'common/interface/interface';

type Props = {
  isVisible: boolean;
  onClose: VoidAction;
  onSubmit: VoidCallback<CreateLessonRequestDto>;
  isSubmitting: boolean;
};

const [, ...CONTENT_TYPE_OPTIONS] = CONTENT_TYPE_OPTIONS_WITH_ALL;

const CreateLessonModal: FC<Props> = ({
  isVisible,
  onClose,
  onSubmit,
  isSubmitting,
}) => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateLessonRequestDto>(createLessonSchema, {
    [LessonKey.NAME]: '',
    [LessonKey.CONTENT]: '',
  });

  const contentType = watch(LessonKey.CONTENT_TYPE);
  const contentTypeOption = CONTENT_TYPE_OPTIONS.find(
    ({ value }) => value === contentType,
  )!;

  const handleSelectChange = (option: IOption<ContentType>): void => {
    setValue(
      LessonKey.CONTENT_TYPE as keyof CreateLessonRequestDto,
      option.value as ContentType,
    );
  };

  const handleClose = (): void => {
    reset();
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      cancelButton={{
        label: 'Cancel',
        isDisabled: isSubmitting,
        onClick: handleClose,
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
        placeholder="Enter lesson name"
        register={register(LessonKey.NAME)}
        error={errors.name}
      />
      <FormField
        label={FormFieldLabel.CONTENT}
        type={FormFieldType.TEXTAREA}
        placeholder="Enter content"
        register={register(LessonKey.CONTENT)}
        error={errors.content}
      />
      <FormField
        label={FormFieldLabel.CONTENT_TYPE}
        type={FormFieldType.CUSTOM}
      >
        <Select<ContentType>
          options={CONTENT_TYPE_OPTIONS}
          value={contentTypeOption}
          onChange={handleSelectChange}
          placeholder="Select content type"
        />
      </FormField>
    </Modal>
  );
};

export { CreateLessonModal };
