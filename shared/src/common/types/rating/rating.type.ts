import { Statistics, UserDto } from 'common/types/types';

type Rating = (Pick<UserDto, 'nickname' | 'photoUrl' | 'id'> &
  Pick<Statistics, 'averageSpeed'>)[];

export type { Rating };
