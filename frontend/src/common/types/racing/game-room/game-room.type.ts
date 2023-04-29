import { RoomDto } from 'smart-typer-shared/common/types/types';
import { Participant } from 'common/types/types';

type GameRoom = RoomDto & {
  participants: Participant[];
  isGameStarted: boolean;
  commentatorText: string;
  countdownBeforeGame: number;
  gameTime: number;
};

export type { GameRoom };
