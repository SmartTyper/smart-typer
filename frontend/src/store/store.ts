import {
  authApi as authApiService,
  http as httpService,
  localStorage as localStorageService,
  notification as notificationService,
  racingApi as racingApiService,
  settingsApi as settingsApiService,
  userApi as userApiService,
} from 'services/services';
import {
  auth as authActions,
  profile as profileActions,
  racing as racingActions,
  settings as settingsActions,
} from './modules/actions';
import { rootReducer } from './root-reducer';
import { Middleware, configureStore } from './external/external';

const action = {
  authActions,
  profileActions,
  settingsActions,
  racingActions,
};

const service = {
  localStorageService,
  httpService,
  authApiService,
  notificationService,
  userApiService,
  settingsApiService,
  racingApiService,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const errorMiddleware: Middleware = () => (next) => (action) => {
      const message = action.error?.message;
      if (message) {
        service.notificationService.error(message);
      }
      return next(action);
    };

    const middlewares = getDefaultMiddleware({
      thunk: {
        extraArgument: { service, action },
      },
    }).concat([errorMiddleware]);

    return middlewares;
  },
});

export { store, service, action };
