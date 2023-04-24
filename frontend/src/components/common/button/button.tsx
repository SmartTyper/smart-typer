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
  isDisabled?: boolean;
  hasShadowOnHover?: boolean;
};

const Button: FC<Props> = ({
  label,
  iconName,
  className,
  iconClassName,
  onClick,
  isLoading = false,
  isDisabled = false,
  hasShadowOnHover = true,
}) => (
  <button
    className={clsx(
      styles.button,
      className,
      hasShadowOnHover && styles.hasShadowOnHover,
    )}
    disabled={isDisabled || isLoading}
    onClick={isDisabled ? undefined : onClick}
  >
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

export { Button };
