import { FormFieldType } from 'common/enums/enums';
import { RBForm } from 'components/external/external';
import { FC, UseFormRegisterReturn } from 'common/types/types';
import { clsx } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  register?: Partial<UseFormRegisterReturn>;
  className?: string;
  value?: string;
  readOnly: boolean;
};

const Checkbox: FC<Props> = ({
  register,
  className,
  value,
  readOnly,
}) => (
  <RBForm.Check
    {...register}
    type={FormFieldType.CHECKBOX}
    className={clsx(styles.checkbox, className)}
    readOnly={readOnly}
    value={value}
  />
);

export { Checkbox };
