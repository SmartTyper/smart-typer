import { RoomDto } from 'smart-typer-shared/common/types/types';
import { Participant } from 'common/types/types';

type GameRoom = Omit<RoomDto, 'participants'> & {
  participants: Participant[];
  commentatorText: string;
  countdownBeforeGame: number;
  gameTime: number;
};

export type { GameRoom };
