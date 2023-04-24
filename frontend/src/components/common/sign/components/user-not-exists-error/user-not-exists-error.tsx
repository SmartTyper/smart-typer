import { FC } from 'common/types/types';
import { RBAlert } from 'components/external/external';

type Props = {
  error: string;
};

const UserNotExistsError: FC<Props> = ({ error }) => {
  return <RBAlert variant="danger">{error}</RBAlert>;
};

export { UserNotExistsError };
