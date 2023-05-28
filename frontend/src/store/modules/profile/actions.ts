import { createAction, createAsyncThunk } from 'store/external/external';
import {
  UserDto,
  UserIdDto,
  UserProfileInfoResponseDto,
  UpdateAvatarResponseDto,
} from 'common/types/types';
import { ActionType } from './action-type';
import { UserKey } from 'smart-typer-shared';

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
  ): Promise<UpdateAvatarResponseDto[UserKey.PHOTO_URL]> => {
    const { userApi: userApiService } = services;
    const { photoUrl } = await userApiService.updateAvatar(payload);
    return photoUrl;
  },
);

const updatePersonalInfo = createAsyncThunk(
  ActionType.UPDATE_PERSONAL_INFO,
  async (
    payload: Partial<Pick<UserDto, UserKey.NICKNAME | UserKey.EMAIL>>,
    { dispatch, extra: { services, actions } },
  ): Promise<Partial<Pick<UserDto, UserKey.NICKNAME | UserKey.EMAIL>>> => {
    const { userApi: userApiService } = services;
    const { auth: authActions } = actions;
    await userApiService.updatePersonalInfo(payload);
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
  updatePersonalInfo,
  deleteAvatar,
};

export { actions };
