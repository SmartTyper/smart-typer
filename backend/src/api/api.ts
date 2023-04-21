import { Router } from 'express';
import {
  getValidationMiddleware,
  getAuthMiddleware,
  getErrorHandlerMiddleware,
} from 'api/middlewares/middlewares';
import { getRoutes } from 'api/routes/routes';
import { auth as authService, token as tokenService } from 'services/services';
import { Logger } from 'common/types/types';

const initApi = (logger: Logger): Router => {
  const router: Router = Router();

  router.use(
    '/api',
    getAuthMiddleware({ tokenService }),
    getRoutes({ getValidationMiddleware, authService, tokenService }),
  );

  router.use('/*', getErrorHandlerMiddleware({ logger }));
  return router;
};

export { initApi };
