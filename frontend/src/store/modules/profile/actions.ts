import { createAction, createAsyncThunk } from 'store/external/external';
import {
  UserDto,
  UserIdDto,
  UserProfileInfoResponseDto,
  UpdateAvatarResponseDto,
} from 'common/types/types';
import { ActionType } from './action-type';

const loadUser = createAsyncThunk(
  ActionType.LOAD_USER,
  async (
    payload: UserIdDto,
    { extra: { services } },
  ): Promise<UserProfileInfoResponseDto> => {
    const { userApi: userApiService } = services;
    return userApiService.getProfileInfo(payload);
  },
);

const resetAll = createAction(ActionType.RESET_ALL);

const updateAvatar = createAsyncThunk(
  ActionType.UPDATE_AVATAR,
  async (
    payload: File,
    { extra: { services } },
  ): Promise<UpdateAvatarResponseDto['photoUrl']> => {
    const { userApi: userApiService } = services;
    const { photoUrl } = await userApiService.updateAvatar(payload);
    return photoUrl;
  },
);

const updateInfo = createAsyncThunk(
  ActionType.UPDATE_INFO,
  async (
    payload: Partial<UserDto>,
    { dispatch, extra: { services, actions } },
  ): Promise<Partial<UserDto>> => {
    const { userApi: userApiService } = services;
    const { auth: authActions } = actions;
    await userApiService.updateInfo(payload);
    dispatch(authActions.updateUser(payload));
    return payload;
  },
);

const deleteAvatar = createAsyncThunk(
  ActionType.DELETE_AVATAR,
  async (_: undefined, { extra: { services } }): Promise<void> => {
    const { userApi: userApiService } = services;
    await userApiService.deleteAvatar();
  },
);

const actions = {
  loadUser,
  resetAll,
  updateAvatar,
  updateInfo,
  deleteAvatar,
};

export { actions };
