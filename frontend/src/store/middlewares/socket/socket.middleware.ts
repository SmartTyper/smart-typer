import {
  Middleware,
  RoomDto,
  UserDto,
  ParticipantIdDto,
} from 'common/types/types';
import { SocketEvent, UserKey } from 'common/enums/enums';
import { socket as socketService } from 'services/services';
import { racing as racingActions } from 'store/modules/actions';

type Options = {
  socketService: typeof socketService;
  racingActions: typeof racingActions;
};

const getSocketMiddleware = ({ socketService }: Options): Middleware => {
  return ({ dispatch }) => {
    socketService.on(SocketEvent.CREATE_ROOM, (payload: RoomDto) => {
      dispatch(racingActions.addRoomToAvailableRooms(payload));
    });

    socketService.on(
      SocketEvent.ADD_PARTICIPANT,
      (payload: Omit<UserDto, UserKey.EMAIL>) => {
        dispatch(racingActions.addParticipant(payload));
      },
    );

    socketService.on(
      SocketEvent.REMOVE_PARTICIPANT,
      (payload: ParticipantIdDto) => {
        dispatch(racingActions.removeParticipant(payload));
      },
    );

    socketService.on(
      SocketEvent.TOGGLE_PARTICIPANT_IS_READY,
      (payload: ParticipantIdDto) => {
        dispatch(racingActions.toggleParticipantIsReady(payload));
      },
    );

    socketService.on(
      SocketEvent.INCREASE_PARTICIPANT_POSITION,
      (payload: ParticipantIdDto) => {
        dispatch(racingActions.increaseParticipantPosition(payload));
      },
    );

    return (next) => (action) => {
      if (racingActions.joinRoom.fulfilled.match(action)) {
        socketService.emit(SocketEvent.JOIN_ROOM, action.payload);
      }
      if (racingActions.leaveRoom.fulfilled.match(action)) {
        socketService.emit(SocketEvent.LEAVE_ROOM, action.payload);
      }
      if (racingActions.increaseCurrentParticipantPosition.match(action)) {
        socketService.emit(
          SocketEvent.INCREASE_CURRENT_PARTICIPANT_POSITION,
          action.payload,
        );
      }
      if (racingActions.toggleCurrentParticipantIsReady.match(action)) {
        socketService.emit(
          SocketEvent.TOGGLE_CURRENT_PARTICIPANT_IS_READY,
          action.payload,
        );
      }
      return next(action);
    };
  };
};

export { getSocketMiddleware };
