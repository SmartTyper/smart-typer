import { Router } from 'express';
import { getValidationMiddleware } from 'api/middlewares/middlewares';
import {
  auth as authService,
  token as tokenService,
  user as userService,
} from 'services/services';
import { Auth } from './auth/auth.route';
import { User } from './user/user.route';

type Options = {
  authService: typeof authService;
  tokenService: typeof tokenService;
  userService: typeof userService;
  getValidationMiddleware: typeof getValidationMiddleware;
};

const getRoutes = (opts: Options): Router => {
  const router: Router = Router();
  const authRoutes = new Auth(opts).getRoutes();
  const userRoutes = new User(opts).getRoutes();

  router.use('/auth', authRoutes);
  router.use('/user', userRoutes);

  return router;
};

export { getRoutes };
