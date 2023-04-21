import { Router } from 'express';
import { Auth } from './auth/auth.route';
import { getValidationMiddleware } from 'api/middlewares/middlewares';
import { auth as authService, token as tokenService } from 'services/services';

type Options = {
  authService: typeof authService;
  tokenService: typeof tokenService;
  getValidationMiddleware: typeof getValidationMiddleware;
};

const getRoutes = (opts: Options): Router => {
  const router: Router = Router();
  const authRoutes = new Auth(opts).getRoutes();

  router.use('/auth', authRoutes);
  return router;
};

export { getRoutes };
