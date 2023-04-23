import { Router } from 'express';
import { Abstract } from '../abstract/abstract.route';
import { user as userService } from 'services/services';
import { IRequestWithUser } from 'common/interfaces/interfaces';

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
      '/',
      this._run((req: IRequestWithUser) => {
        const queryUserId = req.query.userId;
        const userId = queryUserId ? Number(queryUserId) : req.userId;
        return this._userService.getFullInfoById(userId);
      }),
    );

    return router;
  }
}

export { User };
