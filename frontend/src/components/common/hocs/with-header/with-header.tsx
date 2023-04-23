import { FC } from 'common/types/types';
import { useSelector } from 'hooks/hooks';
import { SpinnerSize } from 'common/enums/enums';
import { Spinner } from '../../spinner/spinner';
import { Header } from '../../header/header';

import styles from './styles.module.scss';

const WithHeader: FC = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className={styles.withHeader}>
      {!user ? (
        <Spinner size={SpinnerSize.LARGE} />
      ) : (
        <>
          <div className={styles.header}>
            <Header />
          </div>
          <div className={styles.childComponent}>{children}</div>
        </>
      )}
    </div>
  );
};

export { WithHeader };
