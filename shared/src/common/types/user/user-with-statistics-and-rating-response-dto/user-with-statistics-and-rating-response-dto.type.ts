import { Statistics } from 'common/types/statistics/statistics.type';
import { Rating } from 'common/types/rating/rating.type';
import { UserDto } from '../user-dto/user-dto.type';

type UserWithStatisticsAndRatingResponseDto = UserDto & {
  statistics: Statistics;
  rating: Rating;
};

export type { UserWithStatisticsAndRatingResponseDto };
