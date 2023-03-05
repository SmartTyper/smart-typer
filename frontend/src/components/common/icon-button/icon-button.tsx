import { FC, VoidAction } from 'common/types/types';
import { clsx } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  label?: string;
  iconName?: string;
  className?: string;
  iconClassName?: string;
  onClick: VoidAction;
};

const IconButton: FC<Props> = ({
  label,
  iconName,
  className,
  iconClassName,
  onClick,
}) => (
  <button className={clsx(styles.button, className)} onClick={onClick}>
    {iconName && <i className={clsx(iconName, iconClassName)}></i>}
    {label && <span>{label}</span>}
  </button>
);

export { IconButton };
