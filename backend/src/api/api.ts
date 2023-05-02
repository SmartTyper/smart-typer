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
  settings as settingsService,
  room as roomService,
  logger as loggerService,
} from 'services/services';

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
    settingsService,
    roomService,
    loggerService,
  }),
);

router.use('/*', getErrorHandlerMiddleware({ loggerService }));

export { router };
