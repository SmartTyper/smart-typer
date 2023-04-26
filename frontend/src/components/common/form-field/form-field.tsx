import { FC, FieldError, UseFormRegisterReturn } from 'common/types/types';
import { FormFieldType } from 'common/enums/enums';
import { HiddenInput, Input } from './components/components';
import { RBForm } from 'components/external/external';

import styles from './styles.module.scss';

type Props = {
  label: string;
  type: FormFieldType;
  placeholder: string;
  note?: string | JSX.Element;
  register: UseFormRegisterReturn;
  error?: FieldError;
  value?: string;
};

const FormField: FC<Props> = ({
  label,
  type,
  placeholder,
  note,
  register,
  error,
  value,
}) => {
  return (
    <RBForm.Group className={styles.formField} controlId={label}>
      <RBForm.Label className={styles.label}>{label}</RBForm.Label>
      {type === FormFieldType.PASSWORD ? (
        <HiddenInput
          placeholder={placeholder}
          value={value}
          register={register}
          error={error}
          className={styles.input}
        />
      ) : (
        <Input
          placeholder={placeholder}
          value={value}
          type={type}
          register={register}
          error={error}
          className={styles.input}
        />
      )}
      {!!error && (
        <RBForm.Control.Feedback type="invalid">
          {error?.message}
        </RBForm.Control.Feedback>
      )}
      {!!note && <RBForm.Text className={styles.note}>{note}</RBForm.Text>}
    </RBForm.Group>
  );
};

export { FormField };
