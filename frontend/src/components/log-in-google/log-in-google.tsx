import { useDispatch, useNavigate, useEffect } from 'hooks/hooks';
import { auth as authActions } from 'store/modules/actions';
import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';

import styles from './styles.module.scss';

const LogInGoogle: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = new URL(window.location.href).searchParams;
  const code = search.get('code');

  useEffect(() => {
    if (code) {
      handleGoogle(code);
    } else {
      navigate(AppRoute.ROOT);
    }
  }, []);

  const handleGoogle = async (code: string): Promise<void> => {
    await dispatch(authActions.logInGoogle({ code }));
    navigate(AppRoute.ROOT);
  };

  return (
    <div className={styles.message}>Log in with Google. Please wait a bit</div>
  );
};

export { LogInGoogle };
