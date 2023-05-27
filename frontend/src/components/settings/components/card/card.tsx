import { CardHeaderColor } from 'components/settings/common/enums/enums';
import { clsx } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  title: string;
  color: CardHeaderColor;
  children: JSX.Element | JSX.Element[];
};

const Card: React.FC<Props> = ({ color, title, children }) => {
  return (
    <div className={clsx(styles.settingItem, styles[color])}>
      <h3 className={styles.settingTitle}>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export { Card };
