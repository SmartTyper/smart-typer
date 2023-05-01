import { RoomDto } from 'smart-typer-shared/common/types/types';
import { Participant } from 'common/types/types';

type GameRoom = Omit<RoomDto, 'lessonId' | 'participants'> & {
  participants: Participant[];
  commentatorText: string;
  countdownBeforeGame: number;
  gameTime: number;
  lessonContent: string;
};

export type { GameRoom };
