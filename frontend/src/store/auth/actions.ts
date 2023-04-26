import { createAction, createAsyncThunk } from 'store/external';
import { IUser } from 'common/interfaces/interfaces';
import {
  HttpErrorMessage,
  StorageKey,
  NotificationMessage,
} from 'common/enums/enums';
import {
  LogInUserRequestDto,
  RegisterUserRequestDto,
  GoogleLogInCodeRequestDto,
  SetPasswordRequestDto,
  ResetPasswordRequestDto,
} from 'common/types/types';
import { HttpError } from 'exceptions/exceptions';
import { AuthActionType } from './common';

const logIn = createAsyncThunk(
  AuthActionType.LOG_IN,
  async (
    payload: LogInUserRequestDto,
    { dispatch, extra },
  ): Promise<IUser | void> => {
    try {
      const { authApiService, localStorageService } = extra;
      const userInfo = await authApiService.logInUser(payload);
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
        dispatch(setError(error.message));
      } else {
        throw error;
      }
    }
  },
);

const setError = createAction(
  AuthActionType.SET_ERROR,
  (authError: HttpErrorMessage) => ({
    payload: authError,
  }),
);

const register = createAsyncThunk(
  AuthActionType.REGISTER,
  async (payload: RegisterUserRequestDto, { extra }): Promise<IUser> => {
    const { authApiService, localStorageService } = extra;
    const userInfo = await authApiService.registerUser(payload);
    const { accessToken, refreshToken, ...user } = userInfo;
    localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    localStorageService.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
    return user;
  },
);

const logOut = createAsyncThunk(
  AuthActionType.LOG_OUT,
  async (_: undefined, { extra }): Promise<void> => {
    const { authApiService, localStorageService } = extra;
    const refreshToken = localStorageService.getItem(StorageKey.REFRESH_TOKEN);
    localStorageService.removeItem(StorageKey.ACCESS_TOKEN);
    localStorageService.removeItem(StorageKey.REFRESH_TOKEN);
    if (refreshToken) {
      await authApiService.logOut({ refreshToken });
    }
  },
);

const logInGoogle = createAsyncThunk(
  AuthActionType.LOG_IN_GOOGLE,
  async (payload: GoogleLogInCodeRequestDto, { extra }): Promise<IUser> => {
    const { authApiService, localStorageService } = extra;
    const userInfo = await authApiService.logInGoogle(payload);
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

const resetPassword = createAsyncThunk(
  AuthActionType.RESET_PASSWORD,
  async (
    payload: ResetPasswordRequestDto,
    { dispatch, extra },
  ): Promise<void> => {
    try {
      const { notificationService, authApiService } = extra;
      await authApiService.resetPassword(payload);
      notificationService.info(NotificationMessage.RESET_PASSWORD_SENT);
    } catch (error) {
      const isHttpError = error instanceof HttpError;
      if (isHttpError && error.message === HttpErrorMessage.NO_SUCH_EMAIL) {
        dispatch(setError(error.message));
      } else {
        throw error;
      }
    }
  },
);

const setPassword = createAsyncThunk(
  AuthActionType.SET_PASSWORD,
  async (payload: SetPasswordRequestDto, { extra }): Promise<IUser> => {
    const { notificationService, authApiService, localStorageService } = extra;
    const userInfo = await authApiService.setPassword(payload);
    const { accessToken, refreshToken, ...user } = userInfo;
    localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    localStorageService.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
    notificationService.info(NotificationMessage.RESET_PASSWORD_SENT);
    notificationService.success(NotificationMessage.NEW_PASSWORD_SAVED);
    return user;
  },
);

const authActions = {
  logIn,
  setError,
  register,
  logOut,
  logInGoogle,
  loadUser,
  setPassword,
  resetPassword,
};

export { authActions };
