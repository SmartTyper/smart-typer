import { Button, Card } from 'react-bootstrap';
import { AppRoute, AvatarSize } from 'common/enums/enums';
import { FC, RoomDto } from 'common/types/types';
import { replaceRouteIdParam } from 'helpers/helpers';
import { Link } from 'components/common/common';
import { Avatar } from 'components/common/common';

type Props = {
  room: RoomDto;
};

const RoomItem: FC<Props> = ({ room }) => {
  const { participants, name, id } = room;
  return (
    <Card className="rounded border-0 p-0">
      <Link
        to={replaceRouteIdParam(AppRoute.ROOMS_$ID, id)}
        className="w-100 h-100"
      >
        <Button variant="light" className="bg-white w-100 h-100">
          <Card.Body className="d-flex align-items-center justify-content-center">
            <Card.Title className="text-break">{name}</Card.Title>
            {participants.map(({ id, nickname, photoUrl }) => (
              <Avatar
                size={AvatarSize.SMALL}
                src={photoUrl}
                name={nickname}
                key={id}
              ></Avatar>
            ))}
          </Card.Body>
        </Button>
      </Link>
    </Card>
  );
};
export { RoomItem };
