import { createAction, createAsyncThunk } from 'store/external';
import {
  HttpErrorMessage,
  StorageKey,
  NotificationMessage,
} from 'common/enums/enums';
import {
  UserDto,
  LogInRequestDto,
  RegisterRequestDto,
  GoogleLogInCodeRequestDto,
  SetPasswordRequestDto,
  ResetPasswordRequestDto,
} from 'common/types/types';
import { HttpError } from 'exceptions/exceptions';
import { AuthActionType } from './common';

const logIn = createAsyncThunk(
  AuthActionType.LOG_IN,
  async (
    payload: LogInRequestDto,
    { dispatch, extra: { service, action } },
  ): Promise<UserDto | void> => {
    try {
      const { authApiService, localStorageService } = service;
      const { settingsActions } = action;
      const userData = await authApiService.logIn(payload);
      const { accessToken, refreshToken, settings, ...user } = userData;
      localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
      localStorageService.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
      dispatch(settingsActions.setAll(settings));
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
  async (
    payload: RegisterRequestDto,
    { dispatch, extra: { service, action } },
  ): Promise<UserDto> => {
    const { authApiService, localStorageService } = service;
    const { settingsActions } = action;
    const userData = await authApiService.register(payload);
    const { accessToken, refreshToken, settings, ...user } = userData;
    localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    localStorageService.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
    dispatch(settingsActions.setAll(settings));
    return user;
  },
);

const logOut = createAsyncThunk(
  AuthActionType.LOG_OUT,
  async (_: undefined, { dispatch, extra: { service, action } }): Promise<void> => {
    const { authApiService, localStorageService } = service;
    const { settingsActions } = action;
    const refreshToken = localStorageService.getItem(StorageKey.REFRESH_TOKEN);
    localStorageService.removeItem(StorageKey.ACCESS_TOKEN);
    localStorageService.removeItem(StorageKey.REFRESH_TOKEN);
    dispatch(settingsActions.resetAllToDefault());
    if (refreshToken) {
      await authApiService.logOut({ refreshToken });
    }
  },
);

const logInGoogle = createAsyncThunk(
  AuthActionType.LOG_IN_GOOGLE,
  async (
    payload: GoogleLogInCodeRequestDto,
    { dispatch, extra: { service, action } },
  ): Promise<UserDto> => {
    const { authApiService, localStorageService } = service;
    const { settingsActions } = action;
    const userData = await authApiService.logInGoogle(payload);
    const { accessToken, refreshToken, settings, ...user } = userData;
    localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    localStorageService.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
    dispatch(settingsActions.setAll(settings));
    return user;
  },
);

const loadUser = createAsyncThunk(
  AuthActionType.LOAD_USER,
  async (
    _: undefined,
    { dispatch, extra: { service, action } },
  ): Promise<UserDto | void> => {
    const { userApiService, localStorageService } = service;
    const { settingsActions } = action;
    const accessToken = localStorageService.getItem(StorageKey.ACCESS_TOKEN);
    if (accessToken) {
      const { settings, ...user } =
        await userApiService.getWithTokensAndSettings();
      dispatch(settingsActions.setAll(settings));
      return user;
    }
  },
);

const updateUser = createAction(
  AuthActionType.UPDATE_USER,
  (payload: Partial<UserDto>) => ({ payload }),
);

const resetPassword = createAsyncThunk(
  AuthActionType.RESET_PASSWORD,
  async (
    payload: ResetPasswordRequestDto,
    { dispatch, extra: { service } },
  ): Promise<void> => {
    try {
      const { notificationService, authApiService } = service;
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
  async (
    payload: SetPasswordRequestDto,
    { extra: { service } },
  ): Promise<UserDto> => {
    const { notificationService, authApiService, localStorageService } =
      service;
    const userData = await authApiService.setPassword(payload);
    const { accessToken, refreshToken, ...user } = userData;
    localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    localStorageService.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
    notificationService.info(NotificationMessage.RESET_PASSWORD_SENT);
    notificationService.success(NotificationMessage.NEW_PASSWORD_SAVED);
    return user;
  },
);

const auth = {
  logIn,
  setError,
  register,
  logOut,
  logInGoogle,
  loadUser,
  updateUser,
  setPassword,
  resetPassword,
};

export { auth };
