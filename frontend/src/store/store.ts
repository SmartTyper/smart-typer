import { Middleware } from 'common/types/types';
import { configureStore } from 'store/external/external';
import * as services from 'services/services';
import * as actions from 'store/modules/actions';
import * as rootReducer from 'store/modules/reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const errorMiddleware: Middleware = () => (next) => (action) => {
      const message = action.error?.message;
      if (message) {
        services.notification.error(message);
      }
      return next(action);
    };

    const middlewares = getDefaultMiddleware({
      thunk: {
        extraArgument: { services, actions },
      },
    }).concat([errorMiddleware]);

    return middlewares;
  },
});

export { store, services, actions };
