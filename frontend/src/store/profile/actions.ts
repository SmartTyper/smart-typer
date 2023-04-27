import { createAction, createAsyncThunk } from 'store/external';
import {
  UserDto,
  UserIdDto,
  UserWithStatisticsAndRatingResponseDto,
  UpdateAvatarResponseDto,
} from 'common/types/types';
import { ProfileActionType } from './common';

const loadUser = createAsyncThunk(
  ProfileActionType.LOAD_USER,
  async (
    payload: UserIdDto,
    { extra: { service } },
  ): Promise<UserWithStatisticsAndRatingResponseDto> => {
    const { userApiService } = service;
    return userApiService.getWithStatisticsAndRating(payload);
  },
);

const resetAllToDefault = createAction(ProfileActionType.RESET_ALL_TO_DEFAULT);

const updateAvatar = createAsyncThunk(
  ProfileActionType.UPDATE_AVATAR,
  async (
    payload: File,
    { extra: { service } },
  ): Promise<UpdateAvatarResponseDto> => {
    const { userApiService } = service;
    return userApiService.updateAvatar(payload);
  },
);

const updateInfo = createAsyncThunk(
  ProfileActionType.UPDATE_INFO,
  async (
    payload: Partial<UserDto>,
    { dispatch, extra: { service, action } },
  ): Promise<Partial<UserDto>> => {
    const { userApiService } = service;
    await userApiService.updateInfo(payload);
    dispatch(action.authActions.updateUser(payload));
    return payload;
  },
);

const deleteAvatar = createAsyncThunk(
  ProfileActionType.DELETE_AVATAR,
  async (_: undefined, { extra: { service } }): Promise<void> => {
    const { userApiService } = service;
    await userApiService.deleteAvatar();
  },
);

const profile = {
  loadUser,
  resetAllToDefault,
  updateAvatar,
  updateInfo,
  deleteAvatar,
};

export { profile };
