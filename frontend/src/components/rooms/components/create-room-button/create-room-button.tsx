import { FC } from 'common/types/types';
import { clsx } from 'helpers/helpers';
import { Button, Card } from 'react-bootstrap';

import styles from './styles.module.scss';

type Props = {
  onClick(): void;
};

const CreateRoomButton: FC<Props> = ({ onClick }) => (
  <Card className="rounded bg-white border-0 p-0">
    <Button
      variant="light"
      className={clsx(
        styles.createButton,
        'bg-white d-flex align-items-center justify-content-center h-100',
      )}
      onClick={onClick}
    >
      <span className="bi bi-plus-lg" />
    </Button>
  </Card>
);

export { CreateRoomButton };
