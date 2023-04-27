import { AppRoute } from 'common/enums/enums';
import { RRDNavigate, RRDOutlet } from 'components/external/external';
import { FC } from 'common/types/types';
import { User } from 'common/types/types';

type Props = {
  user: User | null;
};

const ProtectedRoute: FC<Props> = ({ user }) => {
  if (user) {
    return <RRDNavigate to={AppRoute.LOG_IN} replace />;
  }
  return <RRDOutlet />;
};

export { ProtectedRoute };
