import { CreateButton } from '../create-room-button/create-room-button';
import { RoomItem } from '../room-item/room-item';
import { FC, RoomDto } from 'common/types/types';
import { clsx } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  rooms: RoomDto[];
  onCreate: () => void;
};

const RoomItemList: FC<Props> = ({ rooms, onCreate }) => (
  <div className={clsx(styles.roomsContainer, 'py-2 w-100')}>
    {rooms.map((room: RoomDto) => (
      <RoomItem key={room.id} room={room} />
    ))}
    <CreateButton onClick={onCreate} />
  </div>
);

export { RoomItemList };
