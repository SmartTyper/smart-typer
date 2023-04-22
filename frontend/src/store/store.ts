import { configureStore, Middleware } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { localStorage, http, authApi, notification } from 'services/services';

const service = { localStorage, http, authApi, notification };

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddlewares = getDefaultMiddleware({
      thunk: {
        extraArgument: { service },
      },
    });
    const errorMiddleware: Middleware = () => (next) => (action) => {
      const message = action.error?.message;
      if (message) {
        service.notification.error(message);
      }
      return next(action);
    };
    return [...defaultMiddlewares, errorMiddleware];
  },
});

export { store, service };
