import { UserDto } from 'common/types/types';

type Participant = Pick<UserDto, 'id' | 'nickname' | 'photoUrl'> & {
  position: number;
  isReady: boolean;
  spentTime: number;
};

export type { Participant };
