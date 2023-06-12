import { configureStore } from 'store/external/external';
import * as services from 'services/services';
import * as actions from 'store/modules/actions';
import * as rootReducer from 'store/modules/reducers';
import {
  getErrorHandlerMiddleware,
  getSocketMiddleware,
} from './middlewares/middlewares';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const { notification: notificationService, socket: socketService } =
      services;
    const { racing: racingActions } = actions;
    const errorMiddleware = getErrorHandlerMiddleware({ notificationService });
    const socketMiddleware = getSocketMiddleware({
      socketService,
      racingActions,
    });

    const middlewares = getDefaultMiddleware({
      thunk: {
        extraArgument: { services, actions },
      },
    }).concat([errorMiddleware, socketMiddleware]);

    return middlewares;
  },
});

export { store, services, actions };
