import { Statistics } from '../statistics/statistics.type';
import { User } from '../user/user/user.type';

type Rating = (Pick<User, 'nickname' | 'photoUrl' | 'id'> &
  Pick<Statistics, 'averageSpeed'>)[];

export type { Rating };
