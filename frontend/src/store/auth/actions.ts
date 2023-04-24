import { createAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from 'store/create-async-thunk';
import { IUser } from 'common/interfaces/interfaces';
import { HttpErrorMessage, StorageKey } from 'common/enums/enums';
import {
  LogInUserRequestDto,
  RegisterUserRequestDto,
  GoogleLogInCodeRequestDto,
} from 'common/types/types';
import { AuthActionType } from './common';
import { HttpError } from 'exceptions/exceptions';

const logIn = createAsyncThunk(
  AuthActionType.LOG_IN,
  async (
    logInPayload: LogInUserRequestDto,
    { dispatch, extra },
  ): Promise<IUser | void> => {
    try {
      const { authApiService, localStorageService } = extra;
      const userInfo = await authApiService.logInUser(logInPayload);
      const { accessToken, refreshToken, ...user } = userInfo;
      localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
      localStorageService.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
      return user;
    } catch (error) {
      const isHttpError = error instanceof HttpError;
      if (
        isHttpError &&
        error.message === HttpErrorMessage.INVALID_LOG_IN_DATA
      ) {
        dispatch(setUserNotExistsError(error.message));
      } else {
        throw error;
      }
    }
  },
);

const setUserNotExistsError = createAction(
  AuthActionType.SET_USER_NOT_EXISTS_ERROR,
  (userNotExistsError: string) => ({
    payload: userNotExistsError,
  }),
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
  setUserNotExistsError,
  register,
  logout,
  logInGoogle,
  loadUser,
};

export { authActions };
