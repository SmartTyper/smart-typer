import { createAsyncThunk } from 'store/external';
import {
  UserIdDto,
  UserWithStatisticsAndRatingResponseDto,
} from 'common/types/types';
import { ProfileActionType } from './common';

const loadUser = createAsyncThunk(
  ProfileActionType.LOAD_USER,
  async (
    payload: UserIdDto,
    { extra },
  ): Promise<UserWithStatisticsAndRatingResponseDto> => {
    const { userApiService } = extra;
    return userApiService.getWithStatisticsAndRating(payload);
  },
);

const profileActions = {
  loadUser,
};

export { profileActions };
