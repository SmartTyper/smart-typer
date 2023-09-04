import { FC } from 'common/types/types';
import { Header } from 'components/common/common';

import styles from './styles.module.scss';

const WithHeader: FC = ({ children }) => {
  return (
    <div className={styles.withHeader}>
      <Header />
      <div className={styles.childComponent}>{children}</div>
    </div>
  );
};

export { WithHeader };
