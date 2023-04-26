import { FormFieldType } from 'common/enums/enums';
import { FC, FieldError, UseFormRegisterReturn } from 'common/types/types';
import { RBForm, RBInputGroup } from 'components/external/external';
import { Button } from '../../../button/button';
import { useState } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  placeholder: string;
  value?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
};

const HiddenInput: FC<Props> = ({
  placeholder,
  value,
  register,
  error,
  className,
}) => {
  const [isValueHidden, setIsValueHidden] = useState(true);

  const handleHideValue = (): void => {
    setIsValueHidden(!isValueHidden);
  };

  return (
    <RBInputGroup>
      <RBForm.Control
        {...register}
        type={isValueHidden ? FormFieldType.PASSWORD : FormFieldType.TEXT}
        placeholder={placeholder}
        isInvalid={!!error}
        className={className}
        value={value}
      />
      <Button
        iconName={isValueHidden ? 'bi bi-eye-slash' : 'bi bi-eye'}
        onClick={handleHideValue}
        className={styles.hideValueButton}
        iconClassName={styles.hideValueIcon}
      ></Button>
    </RBInputGroup>
  );
};

export { HiddenInput };
