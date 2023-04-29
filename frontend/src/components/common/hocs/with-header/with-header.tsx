import { FC } from 'common/types/types';
import { useEffect, useNavigate, useSelector } from 'hooks/hooks';
import { AppRoute, SpinnerSize } from 'common/enums/enums';
import { Spinner } from '../../spinner/spinner';
import { Header } from '../../header/header';

import styles from './styles.module.scss';

const WithHeader: FC = ({ children }) => {
  const navigate = useNavigate();
  const { isLogOutLoading, user } = useSelector(({ auth, request }) => ({
    user: auth.user,
    isLogOutLoading: request.authLogOut,
  }));

  useEffect(() => {
    if (!isLogOutLoading && user) {
      navigate(AppRoute.LOG_IN);
    }
  }, [isLogOutLoading, user]);
  return (
    <div className={styles.withHeader}>
      {user ? (
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
