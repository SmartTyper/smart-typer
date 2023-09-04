import { Server } from 'socket.io';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      io: Server;
    }
  }
}
