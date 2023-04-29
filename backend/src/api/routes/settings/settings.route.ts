import { Router } from 'express';
import { settings as settingsService } from 'services/services';
import { IRequestWithUser } from 'common/interfaces/interfaces';
import { Abstract } from '../abstract/abstract.route';

type Constructor = {
  settingsService: typeof settingsService;
};

class User extends Abstract {
  private _settingsService: typeof settingsService;

  public constructor(params: Constructor) {
    super();
    this._settingsService = params.settingsService;
  }

  public getRoutes(): Router {
    const router: Router = Router();

    router.put(
      '/',
      this._run((req: IRequestWithUser) => this._settingsService.updateByUserId(req.userId, req.body),
      ),
    );

    return router;
  }
}

export { User };
