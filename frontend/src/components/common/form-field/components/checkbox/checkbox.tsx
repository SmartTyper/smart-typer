import { FormFieldType } from 'common/enums/enums';
import { RBForm } from 'components/external/external';
import { FC, UseFormRegisterReturn } from 'common/types/types';
import { clsx } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  register?: UseFormRegisterReturn;
  className?: string;
  value?: string;
  readOnly: boolean;
  defaultChecked?: boolean;
};

const Checkbox: FC<Props> = ({
  register,
  className,
  value,
  readOnly,
  defaultChecked,
}) => (
  <RBForm.Check
    {...register}
    type={FormFieldType.CHECKBOX}
    className={clsx(styles.checkbox, className)}
    readOnly={readOnly}
    value={value}
    defaultChecked={defaultChecked}
  />
);

export { Checkbox };
