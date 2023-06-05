import { FC } from 'common/types/types';
import { LabelColor } from 'common/enums/enums';
import { clsx } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  text: string;
  color: LabelColor;
  className?: string;
};

const Label: FC<Props> = ({ text, color, className }) => {
  return (
    <div className={clsx(styles.label, styles[color], className)}>{text}</div>
  );
};

export { Label };
