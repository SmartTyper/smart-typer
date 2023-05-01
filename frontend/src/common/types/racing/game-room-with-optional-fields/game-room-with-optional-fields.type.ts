import { GameRoom, RoomDto } from 'common/types/types';

type GameRoomWithOptionalFields = RoomDto &
  Pick<Partial<GameRoom>, 'countdownBeforeGame' | 'gameTime'>;

export type { GameRoomWithOptionalFields };
