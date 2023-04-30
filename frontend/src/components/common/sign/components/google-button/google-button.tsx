import { FC } from 'common/types/types';
import { ReactGoogleButton } from 'components/external/external';
import { useSelector, useEffect, useDispatch } from 'hooks/hooks';
import { auth as authActions } from 'store/modules/actions';

import styles from './styles.module.scss';

const GoogleButton: FC = () => {
  const { googleUrl } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (googleUrl) {
      window.location.assign(googleUrl);
    }
  }, [googleUrl]);

  const handleGoogleLogIn = (): void => {
    dispatch(authActions.loadGoogleUrl());
  };

  return (
    <ReactGoogleButton
      onClick={handleGoogleLogIn}
      type="light"
      className={styles.googleButton}
      label="Log in with Google"
    />
  );
};

export { GoogleButton };
