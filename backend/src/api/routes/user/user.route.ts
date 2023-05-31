import { Router } from 'express';
import { user as userService } from 'services/services';
import { IRequestWithUser } from 'common/interfaces/interfaces';
import { Abstract } from '../abstract/abstract.route';
import { getFileMiddleware } from 'api/middlewares/middlewares';
import { updatePersonalInfoSchema } from 'validation-schemas/validation-schemas';
import { getValidationMiddleware } from 'api/middlewares/middlewares';
import { UserKey } from 'common/enums/enums';

type Constructor = {
  userService: typeof userService;
  getFileMiddleware: typeof getFileMiddleware;
  getValidationMiddleware: typeof getValidationMiddleware;
};

class User extends Abstract {
  private _userService: typeof userService;
  private _getFileMiddleware: typeof getFileMiddleware;
  private _getValidationMiddleware: typeof getValidationMiddleware;

  public constructor(params: Constructor) {
    super();
    this._userService = params.userService;
    this._getFileMiddleware = params.getFileMiddleware;
    this._getValidationMiddleware = params.getValidationMiddleware;
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
        this._userService.getProfileInfoById(
          Number(req.params.userId),
          req.userId,
        ),
      ),
    );

    router.put(
      '/current',
      this._getValidationMiddleware({ body: updatePersonalInfoSchema }),
      this._run((req: IRequestWithUser) =>
        this._userService.patchById(req.userId, req.body),
      ),
    );

    router.put(
      '/current/avatar',
      this._getFileMiddleware({ fileName: UserKey.PHOTO_URL }),
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
