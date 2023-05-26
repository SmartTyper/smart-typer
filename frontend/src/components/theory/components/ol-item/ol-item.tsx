import { OLItemColor } from 'components/theory/common/enums/enums';
import { clsx } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  title: string;
  text: string;
  color: OLItemColor;
};

const OLItem: React.FC<Props> = ({ color, title, text }) => {
  return (
    <li className={clsx(styles.suggestionItem, styles[color])}>
      <h3 className={styles.suggestionTitle}>{title}</h3>
      <p className={styles.suggestionText}>{text}</p>
    </li>
  );
};

export { OLItem };
