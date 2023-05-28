import { CommonKey, UserKey } from 'common/enums/enums';
import { UserDto } from 'common/types/types';

type Participant = Pick<
  UserDto,
  CommonKey.ID | UserKey.NICKNAME | UserKey.PHOTO_URL
> & {
  position: number;
  isReady: boolean;
  spentTime: number;
};

export type { Participant };
