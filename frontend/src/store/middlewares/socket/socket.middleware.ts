import { Middleware, RoomDto } from 'common/types/types';
import { SocketEvent } from 'common/enums/enums';
import { socket as socketService } from 'services/services';
import { racing as racingActions } from 'store/modules/actions';

type Options = {
  socketService: typeof socketService;
  racingActions: typeof racingActions;
};

const getSocketMiddleware = ({ socketService }: Options): Middleware => {
  return ({ dispatch }) => {
    socketService.on(SocketEvent.CREATE_ROOM, (room: RoomDto) => {
      dispatch(racingActions.addRoomToAvailableRooms(room));
    });

    return (next) => (action) => {
      // if (chatsActions.joinRoom.match(action)) {
      //   chatSocketInstance.emit(SocketEvent.CHAT_JOIN_ROOM, action.payload);
      // }
      return next(action);
    };
  };
};

export { getSocketMiddleware };
