import { Statistics } from '../statistics/statistics.type';
import { UserDto } from '../user/user-dto/user-dto.type';

type Rating = (Pick<UserDto, 'nickname' | 'photoUrl' | 'id'> &
  Pick<Statistics, 'averageSpeed'>)[];

export type { Rating };
