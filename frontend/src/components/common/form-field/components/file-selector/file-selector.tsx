import { FormFieldType } from 'common/enums/enums';
import { RBForm } from 'components/external/external';
import {
  FC,
  UseFormRegisterReturn,
  FieldError,
  RefObject,
} from 'common/types/types';

type Props = {
  placeholder?: string;
  register?: Partial<UseFormRegisterReturn>;
  error?: FieldError;
  className?: string;
  value?: string;
  readOnly: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  hidden?: boolean;
};

const FileSelector: FC<Props> = ({
  placeholder,
  register,
  error,
  className,
  readOnly,
  value,
  hidden,
  inputRef,
}) => (
  <RBForm.Control
    {...register}
    type={FormFieldType.FILE}
    placeholder={placeholder}
    isInvalid={!!error}
    className={className}
    readOnly={readOnly}
    value={value}
    hidden={hidden}
    ref={inputRef}
  />
);

export { FileSelector };
