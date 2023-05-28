import { AppRoute, SpinnerSize } from 'common/enums/enums';
import { RRDNavigate, RRDOutlet } from 'components/external/external';
import { FC } from 'common/types/types';
import { Spinner } from 'components/common/common';

type Props = {
  hasUser: boolean;
  isUserLoading: boolean;
};

const ProtectedRoute: FC<Props> = ({ hasUser, isUserLoading }) => {
  if (isUserLoading) {
    return <Spinner size={SpinnerSize.LARGE} />;
  }
  if (!hasUser) {
    return <RRDNavigate to={AppRoute.LOG_IN} replace />;
  }
  return <RRDOutlet />;
};

export { ProtectedRoute };
