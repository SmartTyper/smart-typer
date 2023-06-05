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
      const {
        settings: settingsActions,
        lessons: lessonsActions,
        racing: racingActions,
      } = actions;
      const userData = await authApiService.logIn(payload);
      const { accessToken, refreshToken, settings, personalRoom, ...user } =
        userData;
      localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
      localStorageService.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
      dispatch(settingsActions.setAll(settings));
      dispatch(racingActions.setPersonalRoom(personalRoom));
      dispatch(lessonsActions.loadLessons());
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
  ): Promise<UserDto | void> => {
    try {
      const { authApi: authApiService, localStorage: localStorageService } =
        services;
      const {
        settings: settingsActions,
        lessons: lessonsActions,
        racing: racingActions,
      } = actions;
      const userData = await authApiService.register(payload);
      const { accessToken, refreshToken, settings, personalRoom, ...user } =
        userData;
      localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
      localStorageService.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
      dispatch(settingsActions.setAll(settings));
      dispatch(racingActions.setPersonalRoom(personalRoom));
      dispatch(lessonsActions.loadLessons());
      return user;
    } catch (error) {
      const isHttpError = error instanceof HttpError;
      if (
        isHttpError &&
        error.message === HttpErrorMessage.EMAIL_ALREADY_EXISTS
      ) {
        dispatch(setError(error.message));
      } else {
        throw error;
      }
    }
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
    const {
      settings: settingsActions,
      lessons: lessonsActions,
      profile: profileActions,
      racing: racingActions,
    } = actions;
    const accessToken = localStorageService.getItem(StorageKey.ACCESS_TOKEN);
    dispatch(settingsActions.resetAll());
    dispatch(lessonsActions.resetAll());
    dispatch(profileActions.resetAll());
    dispatch(racingActions.resetAll());
    if (accessToken) {
      await authApiService.logOut();
      localStorageService.removeItem(StorageKey.ACCESS_TOKEN);
      localStorageService.removeItem(StorageKey.REFRESH_TOKEN);
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
    const {
      settings: settingsActions,
      lessons: lessonsActions,
      racing: racingActions,
    } = actions;
    const userData = await authApiService.logInGoogle(payload);
    const { accessToken, refreshToken, settings, personalRoom, ...user } =
      userData;
    localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    localStorageService.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
    dispatch(settingsActions.setAll(settings));
    dispatch(racingActions.setPersonalRoom(personalRoom));
    dispatch(lessonsActions.loadLessons());
    return user;
  },
);

const loadCurrentUser = createAsyncThunk(
  ActionType.LOAD_CURRENT_USER,
  async (
    _: undefined,
    { dispatch, extra: { services, actions } },
  ): Promise<UserDto | void> => {
    const { userApi: userApiService, localStorage: localStorageService } =
      services;
    const {
      settings: settingsActions,
      lessons: lessonsActions,
      racing: racingActions,
    } = actions;
    const accessToken = localStorageService.getItem(StorageKey.ACCESS_TOKEN);
    if (accessToken) {
      const userData = await userApiService.getAuthInfo();
      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        settings,
        personalRoom,
        ...user
      } = userData;
      localStorageService.setItem(StorageKey.ACCESS_TOKEN, newAccessToken);
      localStorageService.setItem(StorageKey.REFRESH_TOKEN, newRefreshToken);
      dispatch(settingsActions.setAll(settings));
      dispatch(racingActions.setPersonalRoom(personalRoom));
      dispatch(lessonsActions.loadLessons());
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
    { dispatch, extra: { services, actions } },
  ): Promise<UserDto> => {
    const {
      notification: notificationService,
      authApi: authApiService,
      localStorage: localStorageService,
    } = services;
    const {
      settings: settingsActions,
      lessons: lessonsActions,
      racing: racingActions,
    } = actions;
    const userData = await authApiService.setPassword(payload);
    const { accessToken, refreshToken, settings, personalRoom, ...user } =
      userData;
    localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    localStorageService.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
    dispatch(settingsActions.setAll(settings));
    dispatch(racingActions.setPersonalRoom(personalRoom));
    dispatch(lessonsActions.loadLessons());
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
  loadCurrentUser,
  logIn,
  register,
  logOut,
  logInGoogle,
  updateUser,
  setPassword,
  resetPassword,
  loadGoogleUrl,
  setError,
};

export { actions };
