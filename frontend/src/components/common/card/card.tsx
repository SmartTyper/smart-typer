import { CardHeaderColor, CardSize } from 'common/enums/enums';
import { clsx } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  title: string;
  color: CardHeaderColor;
  className?: string;
  childrenContainerClassName?: string;
  children: JSX.Element | JSX.Element[];
  numbered?: boolean;
  size?: CardSize;
};

const Card: React.FC<Props> = ({
  color,
  title,
  className,
  children,
  childrenContainerClassName,
  numbered = false,
  size = CardSize.SMALL,
}) => {
  return (
    <div
      className={clsx(
        styles.card,
        styles[color],
        styles[size],
        numbered && styles.numbered,
        className,
      )}
    >
      <h3 className={styles.title}>{title}</h3>
      <div className={clsx(childrenContainerClassName)}>{children}</div>
    </div>
  );
};

export { Card };
