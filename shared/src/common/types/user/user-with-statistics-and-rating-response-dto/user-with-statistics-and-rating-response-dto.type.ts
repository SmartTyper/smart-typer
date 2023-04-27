import { Statistics } from 'common/types/statistics/statistics.type';
import { Rating } from 'common/types/rating/rating.type';
import { User } from '../user/user.type';

type UserWithStatisticsAndRatingResponseDto = User & {
  statistics: Statistics;
  rating: Rating;
};

export type { UserWithStatisticsAndRatingResponseDto };
