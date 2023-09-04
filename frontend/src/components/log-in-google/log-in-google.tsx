import { AppRoute, SpinnerSize } from 'common/enums/enums';
import { FC } from 'common/types/types';
import {
  useDispatch,
  useEffect,
  useNavigate,
  useSelector,
  useState,
} from 'hooks/hooks';
import { auth as authActions } from 'store/modules/actions';
import { navigation as navigationService } from 'services/services';

import styles from './styles.module.scss';
import { Spinner } from 'components/common/common';

const LogInGoogle: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = navigationService.getUrl();
  const { searchParams } = new URL(url);
  const code = searchParams.get('code');
  const [isInitialState, setIsInitialState] = useState(true);
  const { authLogInGoogle: isGoogleRequestLoading } = useSelector((state) => state.requests);

  useEffect(() => {
    if (code) {
      handleGoogle(code);
    } else {
      navigate(AppRoute.LOG_IN);
    }
  }, []);

  useEffect(() => {
    if (!isGoogleRequestLoading && !isInitialState) {
      navigate(AppRoute.ROOT);
    }
  }, [isGoogleRequestLoading]);

  const handleGoogle = async (code: string): Promise<void> => {
    dispatch(authActions.logInGoogle({ code }));
    setIsInitialState(false);
  };

  return (
    <div className={styles.logInGoogle}>
      <Spinner size={SpinnerSize.SMALL} isCentered={false} />
      <p className={styles.inscription}>
        Log in with Google. Please wait a bit
      </p>
    </div>
  );
};

export { LogInGoogle };
