import { createAsyncThunk } from 'store/create-async-thunk';
import { IUser } from 'common/interfaces/interfaces';
import { StorageKey } from 'common/enums/enums';
import {
  LogInUserRequestDto,
  RegisterUserRequestDto,
  GoogleLogInCodeRequestDto,
} from 'common/types/types';
import { AuthActionType } from './common';

const logIn = createAsyncThunk(
  AuthActionType.LOG_IN,
  async (logInPayload: LogInUserRequestDto, { extra }): Promise<IUser> => {
    const { authApiService, localStorageService } = extra;
    const userInfo = await authApiService.logInUser(logInPayload);
    const { accessToken, refreshToken, ...user } = userInfo;
    localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    localStorageService.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
    return user;
  },
);

const register = createAsyncThunk(
  AuthActionType.REGISTER,
  async (
    registerPayload: RegisterUserRequestDto,
    { extra },
  ): Promise<IUser> => {
    const { authApiService, localStorageService } = extra;
    const userInfo = await authApiService.registerUser(registerPayload);
    const { accessToken, refreshToken, ...user } = userInfo;
    localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    localStorageService.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
    return user;
  },
);

const logout = createAsyncThunk(
  AuthActionType.LOGOUT,
  async (_: undefined, { extra }): Promise<void> => {
    const { authApiService, localStorageService } = extra;
    const refreshToken = localStorageService.getItem(StorageKey.REFRESH_TOKEN);
    localStorageService.removeItem(StorageKey.ACCESS_TOKEN);
    localStorageService.removeItem(StorageKey.REFRESH_TOKEN);
    if (refreshToken) {
      await authApiService.logout({ refreshToken });
    }
  },
);

const logInGoogle = createAsyncThunk(
  AuthActionType.LOG_IN_GOOGLE,
  async (code: GoogleLogInCodeRequestDto, { extra }): Promise<IUser> => {
    const { authApiService, localStorageService } = extra;
    const userInfo = await authApiService.logInGoogle(code);
    const { accessToken, refreshToken, ...user } = userInfo;
    localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    localStorageService.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
    return user;
  },
);

const loadUser = createAsyncThunk(
  AuthActionType.LOAD_USER,
  async (_: undefined, { extra }): Promise<IUser | void> => {
    const { userApiService, localStorageService } = extra;
    const accessToken = localStorageService.getItem(StorageKey.ACCESS_TOKEN);
    if (accessToken) {
      const user = await userApiService.getFullInfo();
      return user;
    }
  },
);

const authActions = {
  logIn,
  register,
  logout,
  logInGoogle,
  loadUser,
};

export { authActions };
