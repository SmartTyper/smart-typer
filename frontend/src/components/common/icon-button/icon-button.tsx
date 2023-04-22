import { FC, VoidAction } from 'common/types/types';
import { clsx } from 'helpers/helpers';
import { Spinner } from '../spinner/spinner';

import styles from './styles.module.scss';
import { SpinnerSize } from 'common/enums/enums';

type Props = {
  label?: string;
  iconName?: string;
  className?: string;
  iconClassName?: string;
  onClick: VoidAction;
  isLoading?: boolean;
};

const IconButton: FC<Props> = ({
  label,
  iconName,
  className,
  iconClassName,
  onClick,
  isLoading = false,
}) => (
  <button className={clsx(styles.button, className)} onClick={onClick}>
    {isLoading ? (
      <Spinner size={SpinnerSize.SMALL} />
    ) : (
      <>
        {iconName && <i className={clsx(iconName, iconClassName)}></i>}
        {label && <span>{label}</span>}
      </>
    )}
  </button>
);

export { IconButton };
