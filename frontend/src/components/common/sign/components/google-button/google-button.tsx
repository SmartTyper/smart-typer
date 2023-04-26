import { FC, GoogleLogInUrlResponseDto } from 'common/types/types';
import { ReactGoogleButton } from 'components/external/external';
import { handleError } from 'helpers/helpers';
import { HttpErrorMessage } from 'common/enums/enums';

import styles from './styles.module.scss';

type Props = {
  getGoogleUrl: () => Promise<GoogleLogInUrlResponseDto>;
  showError: (message: HttpErrorMessage) => void;
};

const GoogleButton: FC<Props> = ({ showError, getGoogleUrl }) => {
  const googleSignIn = async (): Promise<void> => {
    try {
      const { url } = await getGoogleUrl();
      window.location.assign(url);
    } catch (error) {
      handleError(error, showError);
    }
  };

  return (
    <ReactGoogleButton
      onClick={googleSignIn}
      type="light"
      className={styles.googleButton}
      label="Log in with Google"
    />
  );
};

export { GoogleButton };
