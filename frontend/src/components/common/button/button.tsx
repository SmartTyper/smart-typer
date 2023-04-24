import { FC, VoidCallback } from 'common/types/types';
import { clsx } from 'helpers/helpers';
import { Spinner } from '../spinner/spinner';

import styles from './styles.module.scss';
import { SpinnerSize } from 'common/enums/enums';

type Props = {
  label?: string;
  iconName?: string;
  className?: string;
  iconClassName?: string;
  onClick: VoidCallback<React.SyntheticEvent>;
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
}) => {
  const handleClick: VoidCallback<React.SyntheticEvent> = (e) => {
    e.preventDefault();
    onClick(e);
  };

  return (
    <button
      className={clsx(
        styles.button,
        className,
        hasShadowOnHover && styles.hasShadowOnHover,
      )}
      disabled={isDisabled || isLoading}
      onClick={isDisabled ? undefined : handleClick}
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
};

export { Button };
