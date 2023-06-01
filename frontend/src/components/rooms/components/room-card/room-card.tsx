import { FC, RoomDto } from 'common/types/types';
import { replaceRouteIdParam } from 'helpers/helpers';
import { Avatar, Card, Link } from 'components/common/common';
import { AppRoute, AvatarSize, CardHeaderColor } from 'common/enums/enums';

// import styles from './styles.module.scss';

type Props = {
  room: RoomDto;
};

const RoomCard: FC<Props> = ({ room: { id, participants, name } }) => (
  <Card color={CardHeaderColor.GREEN} title={name} centeredTitle>
    <Link to={replaceRouteIdParam(AppRoute.ROOMS_$ID, id)}>
      {participants.map(({ id, nickname, photoUrl }) => (
        <Avatar
          size={AvatarSize.SMALL}
          src={photoUrl}
          name={nickname}
          key={id}
        ></Avatar>
      ))}
    </Link>
  </Card>
);

export { RoomCard };
