import { FormFieldType } from 'common/enums/enums';
import { RBForm } from 'components/external/external';
import { FC, UseFormRegisterReturn, FieldError } from 'common/types/types';

type Props = {
  placeholder?: string;
  type: FormFieldType;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
  value?: string;
  readOnly: boolean;
  defaultValue?: number | string;
};

const Input: FC<Props> = ({
  placeholder,
  type,
  register,
  error,
  className,
  readOnly,
  value,
  defaultValue,
}) => (
  <RBForm.Control
    {...register}
    type={type}
    placeholder={placeholder}
    isInvalid={!!error}
    className={className}
    readOnly={readOnly}
    value={value}
    defaultValue={defaultValue}
  />
);

export { Input };
