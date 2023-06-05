import { FC } from 'common/types/types';
import { RBAlert } from 'components/external/external';

type Props = {
  error: string;
};

const AuthError: FC<Props> = ({ error }) => {
  return <RBAlert variant="danger">{error}</RBAlert>;
};

export { AuthError };
