import { FormFieldType } from 'common/enums/enums';
import { RBForm } from 'components/external/external';
import { FC, UseFormRegisterReturn, FieldError } from 'common/types/types';

type Props = {
  placeholder: string;
  type: FormFieldType;
  value?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
};

const Input: FC<Props> = ({
  placeholder,
  type,
  value,
  register,
  error,
  className,
}) => (
  <RBForm.Control
    {...register}
    type={type}
    placeholder={placeholder}
    isInvalid={!!error}
    className={className}
    value={value}
  />
);

export { Input };
