import { Middleware } from 'common/types/types';
import { notification as notificationService } from 'services/services';

type Options = {
  notificationService: typeof notificationService;
};

const getErrorHandlerMiddleware = ({
  notificationService,
}: Options): Middleware => {
  return () => (next) => (action) => {
    const message = action.error?.message;
    if (message) {
      notificationService.error(message);
    }
    return next(action);
  };
};
export { getErrorHandlerMiddleware };
