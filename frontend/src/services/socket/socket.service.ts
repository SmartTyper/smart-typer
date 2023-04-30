import { VoidCallback } from 'common/types/types';
import { SocketEvent } from 'smart-typer-shared';
import { io, Socket as SocketClient } from 'socket.io-client';

class Socket {
  private _socket: SocketClient;

  public constructor() {
    this._socket = io();
  }

  public on<T>(event: SocketEvent, listener: VoidCallback<T>): void {
    this._socket.on(event, listener);
  }

  public emit(event: SocketEvent): void {
    this._socket.emit(event);
  }
}

export { Socket };
