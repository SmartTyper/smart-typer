import { FormFieldType } from 'common/enums/enums';
import { RBForm } from 'components/external/external';
import { FC, UseFormRegisterReturn } from 'common/types/types';

type Props = {
  register?: UseFormRegisterReturn;
  className?: string;
  value?: string;
  readOnly: boolean;
};

const Checkbox: FC<Props> = ({ register, className, value, readOnly }) => (
  <RBForm.Check
    {...register}
    type={FormFieldType.CHECKBOX}
    className={className}
    readOnly={readOnly}
    value={value}
  />
);

export { Checkbox };
