import { Statistics, Rating, UserDto } from 'common/types/types';

type UserProfileInfoResponseDto = UserDto & {
  statistics: Statistics;
  rating: Rating;
};

export type { UserProfileInfoResponseDto };
