import { FC, RoomDto } from 'common/types/types';
import { replaceRouteIdParam } from 'helpers/helpers';
import { Avatar, Card, Link } from 'components/common/common';
import {
  AppRoute,
  AvatarSize,
  CardHeaderColor,
  CardSize,
} from 'common/enums/enums';

import styles from './styles.module.scss';

type Props = {
  room: RoomDto;
};

const BRIGHT_COLORS = [
  CardHeaderColor.BRIGHT_GREEN,
  CardHeaderColor.BRIGHT_BLUE,
  CardHeaderColor.BRIGHT_ORANGE,
  CardHeaderColor.BRIGHT_PINK,
  CardHeaderColor.BRIGHT_YELLOW,
];

const RoomCard: FC<Props> = ({ room: { id, participants, name } }) => (
  <Link to={replaceRouteIdParam(AppRoute.ROOMS_$ID, id)}>
    <Card
      size={CardSize.NONE}
      color={BRIGHT_COLORS[Math.floor(Math.random() * BRIGHT_COLORS.length)]}
      title={name}
      centeredTitle
      className={styles.roomCard}
      childrenContainerClassName={styles.avatarsContainer}
    >
      {participants.map(({ id, nickname, photoUrl }) => (
        <Avatar
          size={AvatarSize.SMALL}
          src={photoUrl}
          name={nickname}
          key={id}
          className={styles.avatar}
        ></Avatar>
      ))}
    </Card>
  </Link>
);

export { RoomCard };
