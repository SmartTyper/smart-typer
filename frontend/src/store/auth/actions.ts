import { createAsyncThunk } from 'store/create-async-thunk';
import { IUser } from 'common/interfaces/interfaces';
import { StorageKey } from 'common/enums/enums';
import {
  LoginUserRequestDto,
  RegisterUserRequestDto,
  GoogleLoginCodeRequestDto,
} from 'common/types/types';
import { AuthActionType } from './common';

const login = createAsyncThunk(
  AuthActionType.LOGIN,
  async (loginPayload: LoginUserRequestDto, { extra }): Promise<IUser> => {
    const { authApi, localStorage } = extra;
    const userInfo = await authApi.loginUser(loginPayload);
    const { accessToken, refreshToken, ...user } = userInfo;
    localStorage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    localStorage.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
    return user;
  },
);

const register = createAsyncThunk(
  AuthActionType.REGISTER,
  async (
    registerPayload: RegisterUserRequestDto,
    { extra },
  ): Promise<IUser> => {
    const { authApi, localStorage } = extra;
    const userInfo = await authApi.registerUser(registerPayload);
    const { accessToken, refreshToken, ...user } = userInfo;
    localStorage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    localStorage.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
    return user;
  },
);

const logout = createAsyncThunk(
  AuthActionType.LOGOUT,
  async (_: undefined, { extra }): Promise<void> => {
    const { authApi, localStorage } = extra;
    const refreshToken = localStorage.getItem(StorageKey.REFRESH_TOKEN);
    localStorage.removeItem(StorageKey.ACCESS_TOKEN);
    localStorage.removeItem(StorageKey.REFRESH_TOKEN);
    if (refreshToken) {
      await authApi.logout({ refreshToken });
    }
  },
);

const loginGoogle = createAsyncThunk(
  AuthActionType.LOGIN_GOOGLE,
  async (code: GoogleLoginCodeRequestDto, { extra }): Promise<IUser> => {
    const { authApi, localStorage } = extra;
    const userInfo = await authApi.loginGoogle(code);
    const { accessToken, refreshToken, ...user } = userInfo;
    localStorage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    localStorage.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
    return user;
  },
);

const loadUser = createAsyncThunk(
  AuthActionType.LOAD_USER,
  async (_: undefined): Promise<null> => {
    return null;
  },
);

const authActions = {
  login,
  register,
  logout,
  loginGoogle,
  loadUser,
};

export { authActions };
