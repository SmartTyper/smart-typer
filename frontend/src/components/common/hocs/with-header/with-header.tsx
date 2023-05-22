import { FC } from 'common/types/types';
import { useEffect, useNavigate, useSelector } from 'hooks/hooks';
import { AppRoute, SpinnerSize } from 'common/enums/enums';
import { Spinner, Header } from 'components/common/common';

import styles from './styles.module.scss';

const WithHeader: FC = ({ children }) => {
  const navigate = useNavigate();
  const { isLogOutLoading, user } = useSelector(({ auth, requests }) => ({
    user: auth.user,
    isLogOutLoading: requests.authLogOut,
  }));

  useEffect(() => {
    if (!isLogOutLoading && user) {
      navigate(AppRoute.LOG_IN);
    }
  }, [isLogOutLoading, user]);

  return (
    <div className={styles.withHeader}>
      {!user ? (
        <Spinner size={SpinnerSize.LARGE} />
      ) : (
        <>
          <Header />
          <div className={styles.childComponent}>{children}</div>
        </>
      )}
    </div>
  );
};

export { WithHeader };
