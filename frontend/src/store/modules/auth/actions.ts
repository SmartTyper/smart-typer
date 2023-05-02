import { createAction, createAsyncThunk } from 'store/external/external';
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
  GoogleLogInUrlResponseDto,
} from 'common/types/types';
import { HttpError } from 'exceptions/exceptions';
import { ActionType } from './action-type';
import { handleExternalError } from 'helpers/helpers';

const logIn = createAsyncThunk(
  ActionType.LOG_IN,
  async (
    payload: LogInRequestDto,
    { dispatch, extra: { services, actions } },
  ): Promise<UserDto | void> => {
    try {
      const { authApi: authApiService, localStorage: localStorageService } =
        services;
      const { settings: settingsActions } = actions;
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
  ActionType.SET_ERROR,
  (authError: HttpErrorMessage) => ({
    payload: authError,
  }),
);

const register = createAsyncThunk(
  ActionType.REGISTER,
  async (
    payload: RegisterRequestDto,
    { dispatch, extra: { services, actions } },
  ): Promise<UserDto> => {
    const { authApi: authApiService, localStorage: localStorageService } =
      services;
    const { settings: settingsActions } = actions;
    const userData = await authApiService.register(payload);
    const { accessToken, refreshToken, settings, ...user } = userData;
    localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    localStorageService.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
    dispatch(settingsActions.setAll(settings));
    return user;
  },
);

const logOut = createAsyncThunk(
  ActionType.LOG_OUT,
  async (
    _: undefined,
    { dispatch, extra: { services, actions } },
  ): Promise<void> => {
    const { authApi: authApiService, localStorage: localStorageService } =
      services;
    const { settings: settingsActions } = actions;
    const refreshToken = localStorageService.getItem(StorageKey.REFRESH_TOKEN);
    localStorageService.removeItem(StorageKey.ACCESS_TOKEN);
    localStorageService.removeItem(StorageKey.REFRESH_TOKEN);
    dispatch(settingsActions.resetAll());
    if (refreshToken) {
      await authApiService.logOut({ refreshToken });
    }
  },
);

const logInGoogle = createAsyncThunk(
  ActionType.LOG_IN_GOOGLE,
  async (
    payload: GoogleLogInCodeRequestDto,
    { dispatch, extra: { services, actions } },
  ): Promise<UserDto> => {
    const { authApi: authApiService, localStorage: localStorageService } =
      services;
    const { settings: settingsActions } = actions;
    const userData = await authApiService.logInGoogle(payload);
    const { accessToken, refreshToken, settings, ...user } = userData;
    localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    localStorageService.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
    dispatch(settingsActions.setAll(settings));
    return user;
  },
);

const loadUser = createAsyncThunk(
  ActionType.LOAD_USER,
  async (
    _: undefined,
    { dispatch, extra: { services, actions } },
  ): Promise<UserDto | void> => {
    const { userApi: userApiService, localStorage: localStorageService } =
      services;
    const { settings: settingsActions } = actions;
    const accessToken = localStorageService.getItem(StorageKey.ACCESS_TOKEN);
    if (accessToken) {
      const { settings, ...user } = await userApiService.getAuthInfo();
      dispatch(settingsActions.setAll(settings));
      return user;
    }
  },
);

const updateUser = createAction(
  ActionType.UPDATE_USER,
  (payload: Partial<UserDto>) => ({ payload }),
);

const resetPassword = createAsyncThunk(
  ActionType.RESET_PASSWORD,
  async (
    payload: ResetPasswordRequestDto,
    { dispatch, extra: { services } },
  ): Promise<void> => {
    try {
      const { notification: notificationService, authApi: authApiService } =
        services;
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
  ActionType.SET_PASSWORD,
  async (
    payload: SetPasswordRequestDto,
    { extra: { services } },
  ): Promise<UserDto> => {
    const {
      notification: notificationService,
      authApi: authApiService,
      localStorage: localStorageService,
    } = services;
    const userData = await authApiService.setPassword(payload);
    const { accessToken, refreshToken, ...user } = userData;
    localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    localStorageService.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
    notificationService.info(NotificationMessage.RESET_PASSWORD_SENT);
    notificationService.success(NotificationMessage.NEW_PASSWORD_SAVED);
    return user;
  },
);

const loadGoogleUrl = createAsyncThunk(
  ActionType.LOAD_GOOGLE_URL,
  async (
    _: undefined,
    { extra: { services } },
  ): Promise<GoogleLogInUrlResponseDto['url'] | void> => {
    const { notification: notificationService, authApi: authApiService } =
      services;
    try {
      const { url } = await authApiService.getLogInGoogleUrl();
      return url;
    } catch (error) {
      handleExternalError(error, notificationService.error);
    }
  },
);

const actions = {
  logIn,
  register,
  logOut,
  logInGoogle,
  loadUser,
  updateUser,
  setPassword,
  resetPassword,
  loadGoogleUrl,
  setError,
};

export { actions };