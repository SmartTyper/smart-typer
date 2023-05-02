import { SocketErrorMessage } from 'common/enums/enums';
import { SocketEvent } from 'common/enums/socket/soket';
import { Socket as SocketIo, Server } from 'socket.io';

class Socket {
  private _io: Server | null = null;

  initIo(io: Server): void {
    this._io = io;
  }

  public initHandlers(socket: SocketIo): void {
    if (!this._io) {
      throw new Error(SocketErrorMessage.NO_SOCKET_SERVICE_PROVIDED);
    }
    socket.on(SocketEvent.JOIN_ROOM, async ({ roomId }: IRoomAction) => {
      await socket.join(String(roomId));
    });

    socket.on(SocketEvent.LEAVE_ROOM, async ({ roomId }: IRoomAction) => {
      await socket.leave(String(roomId));
    });

    socket.on(
      SocketEvent.TOGGLE_CURRENT_PARTICIPANT_IS_READY,
      async ({ roomId, userId }: IUserRoomAction) => {
        io.to(String(roomId)).emit(SocketEvent.TOGGLE_PARTICIPANT_IS_READY, {
          userId,
        });
      },
    );

    socket.on(
      SocketEvent.INCREASE_CURRENT_PARTICIPANT_POSITION,
      async ({ userId, roomId }: IUserRoomAction) => {
        io.to(String(roomId)).emit(SocketEvent.INCREASE_PARTICIPANT_POSITION, {
          userId,
        });
      },
    );
  }
}
export { Socket };
