import { RoomDto } from 'smart-typer-shared/common/types/types';
import { Participant } from 'common/types/types';
import { GameRoomKey } from 'common/enums/enums';

type GameRoom = Omit<RoomDto, GameRoomKey.PARTICIPANTS> & {
  participants: Participant[];
  commentatorText: string;
  countdownBeforeGame: number;
  gameTime: number;
};

export type { GameRoom };
