import { FC } from 'common/types/types';
import { RBForm } from 'components/external/external';
import {
  authApi as authApiService,
  notification as notificationService,
} from 'services/services';
import { WhiteSheetSize } from 'common/enums/enums';
import { WhiteSheet } from '../white-sheet/white-sheet';
import {
  AlternativeRoute,
  GoogleButton,
  SubmitButton,
  UserNotExistsError,
} from './components/components';
import { AlternativeRoute as AlternativeRouteProp } from './common/common';

import logo from 'assets/img/logo.png';
import styles from './styles.module.scss';

type Props = {
  header: string;
  description: string;
  submitText: string;
  children: JSX.Element | JSX.Element[];
  onSubmit: (e: React.SyntheticEvent) => void;
  isSubmitDisabled?: boolean;
  alternativeRoute?: AlternativeRouteProp;
  userNotExistsError: string | null;
};

const Sign: FC<Props> = ({
  header,
  description,
  submitText,
  children,
  onSubmit,
  isSubmitDisabled = false,
  alternativeRoute,
  userNotExistsError,
}) => {
  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" className={styles.logo}></img>
      <h3>{header}</h3>
      <span>{description}</span>

      <WhiteSheet size={WhiteSheetSize.MEDIUM}>
        <RBForm className={styles.form}>
          <>
            {!!userNotExistsError && (
              <UserNotExistsError error={userNotExistsError} />
            )}
            <div className={styles.formFields}>{children}</div>
            <SubmitButton
              isDisabled={isSubmitDisabled}
              onSubmit={onSubmit}
              label={submitText}
            />
            {!!alternativeRoute && (
              <AlternativeRoute
                label={alternativeRoute.label}
                path={alternativeRoute.path}
                linkText={alternativeRoute.linkText}
              />
            )}
            <div className={styles.orSeparator}>
              <hr className={styles.line} />
              <span>or</span>
              <hr className={styles.line} />
            </div>
            <GoogleButton
              showError={notificationService.error}
              getGoogleUrl={authApiService.getLogInGoogleUrl}
            />
          </>
        </RBForm>
      </WhiteSheet>
    </div>
  );
};

export { Sign };
