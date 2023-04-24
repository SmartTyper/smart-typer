import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { FormFieldType } from 'common/enums/enums';
import { RBForm } from 'components/external/external';

type Props = {
  placeholder: string;
  type: FormFieldType;
  value?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
};

const Input: React.FC<Props> = ({
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
