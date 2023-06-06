import { FormFieldType } from 'common/enums/enums';
import { RBForm } from 'components/external/external';
import { FC, UseFormRegisterReturn, FieldError } from 'common/types/types';

type Props = {
  placeholder?: string;
  type: FormFieldType;
  register?: Partial<UseFormRegisterReturn>;
  error?: FieldError;
  className?: string;
  value?: string;
  readOnly: boolean;
};

const Textarea: FC<Props> = ({
  placeholder,
  type,
  register,
  error,
  className,
  readOnly,
  value,
}) => (
  <RBForm.Control
    {...register}
    type={type}
    placeholder={placeholder}
    isInvalid={!!error}
    className={className}
    readOnly={readOnly}
    value={value}
    as="textarea"
  />
);

export { Textarea };
