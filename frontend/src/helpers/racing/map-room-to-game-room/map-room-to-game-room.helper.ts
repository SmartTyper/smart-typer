import {
  DEFAULT_GAME_ROOM,
  DEFAULT_PARTICIPANT,
} from 'common/constants/constants';
import { GameRoom } from 'common/types/types';

const mapGameRoomToDefault = (room: GameRoom): GameRoom => {
  const participants = room.participants.map((participant) => ({
    ...participant,
    ...DEFAULT_PARTICIPANT,
  }));

  const mappedRoom = {
    ...room,
    ...DEFAULT_GAME_ROOM,
    participants,
  };

  return mappedRoom;
};

export { mapGameRoomToDefault };
