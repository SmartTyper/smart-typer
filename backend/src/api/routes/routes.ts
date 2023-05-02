import { Router } from 'express';
import {
  getValidationMiddleware,
  getFileMiddleware,
} from 'api/middlewares/middlewares';
import {
  auth as authService,
  token as tokenService,
  user as userService,
  settings as settingsService,
  room as roomService,
} from 'services/services';
import { Auth } from './auth/auth.route';
import { User } from './user/user.route';
import { Settings } from './settings/settings.route';
import { Room } from './room/room.route';

type Options = {
  authService: typeof authService;
  tokenService: typeof tokenService;
  userService: typeof userService;
  settingsService: typeof settingsService;
  roomService: typeof roomService;
  getFileMiddleware: typeof getFileMiddleware;
  getValidationMiddleware: typeof getValidationMiddleware;
};

const getRoutes = (opts: Options): Router => {
  const router: Router = Router();
  const authRoutes = new Auth(opts).getRoutes();
  const userRoutes = new User(opts).getRoutes();
  const settingsRoutes = new Settings(opts).getRoutes();
  const roomRoutes = new Room(opts).getRoutes();

  router.use('/auth', authRoutes);
  router.use('/user', userRoutes);
  router.use('/settings', settingsRoutes);
  router.use('/rooms', roomRoutes);

  return router;
};

export { getRoutes };
