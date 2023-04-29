import { Button, Card } from 'react-bootstrap';
import { AppRoute } from 'common/enums';
import { IRoom } from 'common/interfaces';
import { replaceIdParam } from 'common/helpers';
import { Link } from 'components/common';

type Props = {
  room: IRoom;
};

const RoomItem: React.FC<Props> = ({ room }) => (
  <Card className="rounded border-0 p-0">
    <Link to={replaceIdParam(AppRoute.GAME, room.id)} className="w-100 h-100">
      <Button variant="light" className="bg-white w-100 h-100">
        <Card.Body className="d-flex align-items-center justify-content-center">
          <Card.Title className="text-break">{room.name}</Card.Title>
        </Card.Body>
      </Button>
    </Link>
  </Card>
);

export { RoomItem };
