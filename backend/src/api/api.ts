import { Router } from 'express';
import {
  getValidationMiddleware,
  getAuthMiddleware,
  getErrorHandlerMiddleware,
  getFileMiddleware,
} from 'api/middlewares/middlewares';
import { getRoutes } from 'api/routes/routes';
import {
  auth as authService,
  token as tokenService,
  user as userService,
} from 'services/services';
import { Logger } from 'common/types/types';

const initApi = (logger: Logger): Router => {
  const router: Router = Router();

  router.use(
    '/api',
    getAuthMiddleware({ tokenService }),
    getRoutes({
      getFileMiddleware,
      getValidationMiddleware,
      authService,
      tokenService,
      userService,
    }),
  );

  router.use('/*', getErrorHandlerMiddleware({ logger }));
  return router;
};

export { initApi };
