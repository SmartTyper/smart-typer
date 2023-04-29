import { UserDto } from 'common/types/types';

type Participant = Pick<UserDto, 'id' | 'nickname' | 'photoUrl'> & {
  position: number;
  isReady: boolean;
  spentSeconds: number;
};

export type { Participant };
