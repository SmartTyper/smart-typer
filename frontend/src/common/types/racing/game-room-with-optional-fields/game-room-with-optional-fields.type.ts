import { SettingsKey } from 'common/enums/enums';
import { GameRoom, RoomDto } from 'common/types/types';

type GameRoomWithOptionalFields = RoomDto &
  Pick<Partial<GameRoom>, SettingsKey.COUNTDOWN_BEFORE_GAME | SettingsKey.GAME_TIME>;

export type { GameRoomWithOptionalFields };
