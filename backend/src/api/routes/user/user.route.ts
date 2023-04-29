import { Router } from 'express';
import { user as userService } from 'services/services';
import { IRequestWithUser } from 'common/interfaces/interfaces';
import { Abstract } from '../abstract/abstract.route';

type Constructor = {
  userService: typeof userService;
};

class User extends Abstract {
  private _userService: typeof userService;

  public constructor(params: Constructor) {
    super();
    this._userService = params.userService;
  }

  public getRoutes(): Router {
    const router: Router = Router();

    router.get(
      '/current',
      this._run((req: IRequestWithUser) =>
        this._userService.getAuthInfoById(req.userId),
      ),
    );

    router.get(
      '/:userId',
      this._run((req: IRequestWithUser) =>
        this._userService.getProfileInfoById(Number(req.params.userId)),
      ),
    );

    router.put(
      '/current',
      this._run((req: IRequestWithUser) =>
        this._userService.updateById(req.userId, req.body),
      ),
    );

    router.put(
      '/current/avatar',
      this._run((req: IRequestWithUser) =>
        this._userService.updateAvatar(req.userId, req.file),
      ),
    );

    router.delete(
      '/current/avatar',
      this._run((req: IRequestWithUser) =>
        this._userService.deleteAvatar(req.userId),
      ),
    );

    return router;
  }
}

export { User };
