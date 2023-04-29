import { Container as BootstrapContainer } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { SocketContext } from 'socket';

import { HttpError } from 'common/exceptions';
import { Spinner } from 'components/common';
import { AppRoute, LocalStorageVariable, SocketEvents } from 'common/enums';
import { roomActions } from 'store/actions';
import {
  useState,
  useEffect,
  useAppSelector,
  useAppDispatch,
  useContext,
} from 'hooks';
import { IRoom, IRoomAction, IRoomCreation } from 'common/interfaces';
import { getAllowedClasses, replaceIdParam } from 'common/helpers';
import { gameApi } from 'services/game-api.service';
import {
  CreateRoomModal,
  RoomItemList,
  ShareModal,
} from './components/components';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'hooks/hooks';
import { FC } from 'common/types/types';

const Rooms: FC = () => {
  const { shareRoomId, rooms, areRoomsLoading } = useSelector(
    ({ racing, request }) => ({
      rooms: racing.availableRooms,
      shareRoomId: racing.shareRoomId,
      areRoomsLoading: request.racingLoadAvailableRooms,
    }),
  );
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const [isCreateRoomModalVisible, setIsCreateRoomModalVisible] =
    useState(false);
  const [isShareRoomModalVisible, setIsShareRoomModalVisible] = useState(false);

  const onCreatingRoom = (room: IRoom): void => {
    dispatch(roomActions.setCurrentRoom(room));
  };

  const onDeletingRoom = ({ roomId }: IRoomAction): void => {
    dispatch(roomActions.removeRoom(roomId));
  };

  const handleCreate = (): void => setIsCreateRoomModalVisible(true);

  const handleCreationCancel = (): void => {
    setIsCreateRoomModalVisible(false);
  };

  const handleShareCancel = (): void => {
    setIsShareRoomModalVisible(false);
    dispatch(roomActions.setShareRoomId(null));
  };

  const handleCreationConfirm = (data: IRoomCreation): void => {
    dispatch(
      roomActions.createRoom({
        name: data.name,
        type: data.type,
      }),
    );
    setIsShareRoomModalVisible(true);
  };

  useEffect(() => {
    if (shareRoomId) {
      gameApi
        .getShareLink(shareRoomId)
        .then(({ link }) => {
          setShareLink(link);
        })
        .catch((err) => {
          const httpError = err as HttpError;
          toast.error(httpError.message);
        });
    }
  }, [shareRoomId]);

  useEffect(() => {
    if (localStorage.getItem(LocalStorageVariable.ROOM_ID)) {
      localStorage.removeItem(LocalStorageVariable.ROOM_ID);
    }
    dispatch(roomActions.loadRooms());

    socket.on(SocketEvents.CREATE_ROOM, onCreatingRoom);
    socket.on(SocketEvents.DELETE_ROOM, onDeletingRoom);

    return (): void => {
      dispatch(roomActions.setShareRoomId(null));
      socket.off(SocketEvents.CREATE_ROOM, onCreatingRoom);
      socket.off(SocketEvents.DELETE_ROOM, onDeletingRoom);
    };
  }, []);

  return (
    <div className={getAllowedClasses(styles.roomsPage, 'bg-light')}>
      <BootstrapContainer className="h-100 position-relative d-flex flex-column align-items-center pt-5">
        <h1 className="h3 mb-5">Select the room</h1>
        {areRoomsLoading ? (
          <Spinner height={'12rem'} width={'12rem'} />
        ) : (
          <RoomItemList rooms={rooms} onCreate={handleCreate} />
        )}
        <CreateRoomModal
          showModal={isCreateRoomModalVisible}
          onModalClose={handleCreationCancel}
          handleFunction={handleCreationConfirm}
        />
        {shareLink && shareRoomId && (
          <ShareModal
            showModal={isShareRoomModalVisible}
            onModalClose={handleShareCancel}
            link={replaceIdParam(AppRoute.GAME, shareRoomId)}
            shareLink={shareLink}
          />
        )}
      </BootstrapContainer>
    </div>
  );
};

export { Rooms };
