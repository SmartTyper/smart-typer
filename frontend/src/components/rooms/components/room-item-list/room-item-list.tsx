import { CreateRoomButton } from '../create-room-button/create-room-button';
import { RoomItem } from '../room-item/room-item';
import { FC, RoomDto, VoidAction } from 'common/types/types';
import { clsx } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  rooms: RoomDto[];
  onCreateRoomButtonClick: VoidAction;
};

const RoomItemList: FC<Props> = ({ rooms, onCreateRoomButtonClick }) => (
  <div className={clsx(styles.roomsContainer, 'py-2 w-100')}>
    {rooms.map((room: RoomDto) => (
      <RoomItem key={room.id} room={room} />
    ))}
    <CreateRoomButton onClick={onCreateRoomButtonClick} />
  </div>
);

export { RoomItemList };
