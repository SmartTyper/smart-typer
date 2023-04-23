import { AppRoute } from 'common/enums/enums';
import { RRDNavigate, RRDOutlet } from 'components/external/external';
import { FC } from 'common/types/types';
import { IUser } from 'common/interfaces/interfaces';

type Props = {
  user: IUser | null;
};

const ProtectedRoute: FC<Props> = ({ user }) => {
  if (!user) {
    return <RRDNavigate to={AppRoute.LOG_IN} replace />;
  }
  return <RRDOutlet />;
};

export { ProtectedRoute };
