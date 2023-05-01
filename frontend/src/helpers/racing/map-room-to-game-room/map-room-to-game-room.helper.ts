import {
  DEFAULT_GAME_ROOM,
  DEFAULT_PARTICIPANT,
} from 'common/constants/constants';
import { GameRoom, RoomDto } from 'common/types/types';

const mapRoomToGameRoom = (room:  Partial<GameRoom> & RoomDto): GameRoom => {
  const participants = room.participants.map((participant) => ({
    ...DEFAULT_PARTICIPANT,
    ...participant,
  }));

  const currentRoom = {
    ...DEFAULT_GAME_ROOM,
    ...room,
    participants,
  };

  return currentRoom;
};

export { mapRoomToGameRoom };
