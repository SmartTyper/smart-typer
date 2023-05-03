import { SpinnerSize } from 'common/enums/enums';
import { CreateRoomRequestDto, FC } from 'common/types/types';
import { Spinner } from 'components/common/common';
import { RBContainer } from 'components/external/external';
import { clsx } from 'helpers/helpers';
import { useDispatch, useEffect, useSelector, useState } from 'hooks/hooks';
import { racing as racingActions } from 'store/modules/actions';
import {
  CreateRoomModal,
  RoomItemList,
  ShareRoomModal,
} from './components/components';

import styles from './styles.module.scss';

const Rooms: FC = () => {
  const dispatch = useDispatch();
  const { shareRoomUrl, rooms, areRoomsLoading } = useSelector(
    ({ racing, requests }) => ({
      rooms: racing.availableRooms,
      shareRoomUrl: racing.shareRoomUrl,
      areRoomsLoading: requests.racingLoadAvailableRooms,
    }),
  );

  const [isCreateRoomModalVisible, setIsCreateRoomModalVisible] =
    useState(false);
  const [isShareRoomModalVisible, setIsShareRoomModalVisible] = useState(false);

  const handleToggleCreateRoomModalVisible = (): void => {
    setIsCreateRoomModalVisible((prev: boolean) => !prev);
  };

  const handleShareRoomCancel = (): void => {
    setIsShareRoomModalVisible(false);
    dispatch(racingActions.resetShareRoomUrl());
  };

  const handleCreateRoomSubmit = (payload: CreateRoomRequestDto): void => {
    dispatch(racingActions.createRoom(payload));
    setIsShareRoomModalVisible(false);
  };

  useEffect(() => {
    dispatch(racingActions.loadAvailableRooms());
    return () => {
      dispatch(racingActions.resetAvailableRooms());
    };
  }, []);

  return (
    <div className={clsx(styles.roomsPage, 'bg-light')}>
      <RBContainer className="h-100 position-relative d-flex flex-column align-items-center pt-5">
        <h1 className="h3 mb-5">Select the room</h1>
        {areRoomsLoading ? (
          <Spinner size={SpinnerSize.LARGE} />
        ) : (
          <RoomItemList
            rooms={rooms}
            onCreateRoomButtonClick={handleToggleCreateRoomModalVisible}
          />
        )}
        <CreateRoomModal
          isVisible={isCreateRoomModalVisible}
          onClose={handleToggleCreateRoomModalVisible}
          onSubmit={handleCreateRoomSubmit}
        />
        {!!shareRoomUrl && (
          <ShareRoomModal
            isVisible={isShareRoomModalVisible}
            onClose={handleShareRoomCancel}
            shareRoomUrl={shareRoomUrl}
          />
        )}
      </RBContainer>
    </div>
  );
};

export { Rooms };
