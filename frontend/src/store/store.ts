import { configureStore, Middleware } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import {
  localStorage as localStorageService,
  http as httpService,
  authApi as authApiService,
  notification as notificationService,
  userApi as userApiService,
  settingsApi as settingsApiService,
  racingApi as racingApiService,
} from 'services/services';
import * as action from './actions';

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
