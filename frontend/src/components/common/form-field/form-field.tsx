import {
  FC,
  FieldError,
  RefObject,
  UseFormRegisterReturn,
} from 'common/types/types';
import { FormFieldLabel, FormFieldType } from 'common/enums/enums';
import { RBForm } from 'components/external/external';
import {
  Checkbox,
  FileSelector,
  HiddenInput,
  Input,
} from './components/components';
import { useState } from 'hooks/hooks';
import { clsx } from 'helpers/helpers';
import { Button } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  label: FormFieldLabel;
  type: FormFieldType;
  register?: Partial<UseFormRegisterReturn>;
  placeholder?: string;
  note?: string | JSX.Element;
  error?: FieldError;
  className?: string;
  inputClassName?: string;
  value?: string;
  readOnly?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  hidden?: boolean;
  hasCopyButton?: boolean;
  children?: JSX.Element;
};

const FormField: FC<Props> = ({
  label,
  type,
  placeholder,
  note,
  register,
  error,
  className,
  inputClassName,
  value,
  inputRef,
  children,
  readOnly = false,
  hidden = false,
  hasCopyButton = false,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (): void => {
    if (value) {
      navigator.clipboard.writeText(value);
      setIsCopied(true);
    }
  };

  const renderFormField = (type: FormFieldType): JSX.Element | null => {
    switch (type) {
      case FormFieldType.PASSWORD:
        return (
          <HiddenInput
            placeholder={placeholder}
            register={register}
            error={error}
            className={clsx(styles.input, inputClassName)}
            readOnly={readOnly}
            value={value}
          />
        );
      case FormFieldType.CHECKBOX:
        return (
          <Checkbox
            register={register}
            className={inputClassName}
            readOnly={readOnly}
            value={value}
          />
        );
      case FormFieldType.FILE:
        return (
          <FileSelector
            register={register}
            hidden={hidden}
            readOnly={readOnly}
            value={value}
            inputRef={inputRef}
            className={inputClassName}
          />
        );
      case FormFieldType.CUSTOM:
        return children ?? null;
      default:
        return (
          <Input
            placeholder={placeholder}
            type={type}
            register={register}
            error={error}
            className={clsx(styles.input, inputClassName)}
            readOnly={readOnly}
            value={value}
          />
        );
    }
  };
  return (
    <RBForm.Group
      className={clsx(
        styles.formField,
        className,
        type !== FormFieldType.CHECKBOX && styles.flexColumn,
      )}
      controlId={label}
    >
      <RBForm.Label className={styles.label}>{label}</RBForm.Label>
      <div
        className={clsx(
          styles.inputRow,
          hasCopyButton && styles.withCopyButton,
        )}
      >
        {renderFormField(type)}
        {hasCopyButton && (
          <Button onClick={handleCopy} className={styles.copyButton}>
            <i className={isCopied ? 'bi bi-check2' : 'bi bi-clipboard'}></i>
          </Button>
        )}
      </div>
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
