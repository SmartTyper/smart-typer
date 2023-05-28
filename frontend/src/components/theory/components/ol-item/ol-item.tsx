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
      <h5 className={styles.suggestionTitle}>{title}</h5>
      <p className={styles.suggestionText}>{text}</p>
    </li>
  );
};

export { OLItem };
