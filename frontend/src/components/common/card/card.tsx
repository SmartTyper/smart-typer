import { CardHeaderColor, CardSize } from 'common/enums/enums';
import { clsx } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  title?: string;
  color: CardHeaderColor;
  className?: string;
  childrenContainerClassName?: string;
  children: JSX.Element | JSX.Element[];
  numbered?: boolean;
  size?: CardSize;
  centeredTitle?: boolean;
};

const Card: React.FC<Props> = ({
  color,
  title,
  className,
  children,
  childrenContainerClassName,
  numbered = false,
  size = CardSize.MEDIUM,
  centeredTitle = false,
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
      {!!title && (
        <h3 className={clsx(styles.title, centeredTitle && styles.centered)}>
          {title}
        </h3>
      )}
      <div className={clsx(childrenContainerClassName)}>{children}</div>
    </div>
  );
};

export { Card };
