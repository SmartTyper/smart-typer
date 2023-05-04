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
  logger as loggerService,
  lesson as lessonService,
} from 'services/services';
import { Auth } from './auth/auth.route';
import { User } from './user/user.route';
import { Settings } from './settings/settings.route';
import { Room } from './room/room.route';
import { Lesson } from './lesson/lesson.route';

type Options = {
  authService: typeof authService;
  tokenService: typeof tokenService;
  userService: typeof userService;
  settingsService: typeof settingsService;
  roomService: typeof roomService;
  loggerService: typeof loggerService;
  lessonService: typeof lessonService;
  getFileMiddleware: typeof getFileMiddleware;
  getValidationMiddleware: typeof getValidationMiddleware;
};

const getRoutes = (opts: Options): Router => {
  const router: Router = Router();
  const authRoutes = new Auth(opts).getRoutes();
  const userRoutes = new User(opts).getRoutes();
  const settingsRoutes = new Settings(opts).getRoutes();
  const roomRoutes = new Room(opts).getRoutes();
  const lessonRoutes = new Lesson(opts).getRoutes();

  router.use('/auth', authRoutes);
  router.use('/user', userRoutes);
  router.use('/settings', settingsRoutes);
  router.use('/rooms', roomRoutes);
  router.use('/lessons', lessonRoutes);

  return router;
};

export { getRoutes };
