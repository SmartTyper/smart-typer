import { Router } from 'express';
import { joke as jokeService } from 'services/services';
import { Abstract } from '../abstract/abstract.route';
// import { getValidationMiddleware } from 'api/middlewares/middlewares';

type Constructor = {
  jokeService: typeof jokeService;
  // getValidationMiddleware: typeof getValidationMiddleware;
};

class Joke extends Abstract {
  private _jokeService: typeof jokeService;
  // private _getValidationMiddleware: typeof getValidationMiddleware;

  public constructor(params: Constructor) {
    super();
    this._jokeService = params.jokeService;
    // this._getValidationMiddleware = params.getValidationMiddleware;
  }

  public getRoutes(): Router {
    const router: Router = Router();

    router.get(
      '/random',
      this._run(() => this._jokeService.getRandom()),
    );

    return router;
  }
}

export { Joke };
