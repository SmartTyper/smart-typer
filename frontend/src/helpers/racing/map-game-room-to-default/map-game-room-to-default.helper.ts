import { DEFAULT_GAME_ROOM } from 'common/constants/constants';
import { GameRoom, GameRoomWithOptionalFields } from 'common/types/types';
import { mapUserToParticipant } from 'helpers/helpers';

const mapRoomToGameRoom = (room: GameRoomWithOptionalFields): GameRoom => {
  const participants = room.participants.map(mapUserToParticipant);

  const currentRoom = {
    ...DEFAULT_GAME_ROOM,
    ...room,
    participants,
  };

  return currentRoom;
};

export { mapRoomToGameRoom };
