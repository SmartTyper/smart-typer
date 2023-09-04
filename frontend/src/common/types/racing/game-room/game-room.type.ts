import { RoomDto } from 'smart-typer-shared/common/types/types';
import { Participant } from 'common/types/types';
import { CommonKey, RoomKey } from 'common/enums/enums';

type GameRoom = Pick<
  RoomDto,
  CommonKey.ID | RoomKey.LESSON_ID | RoomKey.NAME
> & {
  participants: Participant[];
  commentatorText: string;
  countdownBeforeGame: number;
  gameTime: number;
};

export type { GameRoom };
