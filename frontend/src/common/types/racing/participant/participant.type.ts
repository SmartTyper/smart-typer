import { UserDto } from 'common/types/user/user';

type Participant = Pick<UserDto, 'id' | 'nickname' | 'photoUrl'> & {
  position: number;
  isReady: boolean;
  spentSeconds: number;
};

export type { Participant };
