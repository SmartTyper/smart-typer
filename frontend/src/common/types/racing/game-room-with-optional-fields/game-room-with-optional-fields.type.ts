import { GameRoom, RoomDto } from 'common/types/types';

type GameRoomWithOptionalFields = RoomDto &
  Pick<
    Partial<GameRoom>,
    'countdownBeforeGame' | 'gameTime' | 'commentatorText'
  >;

export type { GameRoomWithOptionalFields };
