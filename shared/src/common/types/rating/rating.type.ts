import { CommonKey, StatisticsKey, UserKey } from 'common/enums/enums';
import { Statistics, UserDto } from 'common/types/types';

type Rating = (Pick<
  UserDto,
  UserKey.NICKNAME | UserKey.PHOTO_URL | CommonKey.ID
> &
  Pick<Statistics, StatisticsKey.AVERAGE_SPEED>)[];

export type { Rating };
