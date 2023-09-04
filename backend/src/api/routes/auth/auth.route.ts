import { Router } from 'express';
import { getValidationMiddleware } from 'api/middlewares/middlewares';
import { auth as authService, token as tokenService } from 'services/services';
import {
  signUpBodySchema,
  logInBodySchema,
  resetPasswordBodySchema,
  setPasswordBodySchema,
  refreshTokensBodySchema,
  logInGoogleBodySchema,
} from 'validation-schemas/validation-schemas';
import { Abstract } from '../abstract/abstract.route';
import { IRequestWithUser } from 'common/interfaces/interfaces';

type Constructor = {
  authService: typeof authService;
  tokenService: typeof tokenService;
  getValidationMiddleware: typeof getValidationMiddleware;
};

class Auth extends Abstract {
  private _authService: typeof authService;
  private _tokenService: typeof tokenService;
  private _getValidationMiddleware: typeof getValidationMiddleware;

  public constructor(params: Constructor) {
    super();
    this._authService = params.authService;
    this._tokenService = params.tokenService;
    this._getValidationMiddleware = params.getValidationMiddleware;
  }

  public getRoutes(): Router {
    const router: Router = Router();

    router.post(
      '/register',
      this._getValidationMiddleware({ body: signUpBodySchema }),
      this._run((req) => this._authService.register(req.body)),
    );

    router.post(
      '/log-in',
      this._getValidationMiddleware({ body: logInBodySchema }),
      this._run((req) => this._authService.logIn(req.body)),
    );

    router.post(
      '/reset-password',
      this._getValidationMiddleware({ body: resetPasswordBodySchema }),
      this._run((req) => this._authService.resetPassword(req.body)),
    );

    router.post(
      '/set-password',
      this._getValidationMiddleware({ body: setPasswordBodySchema }),
      this._run((req) => this._authService.setPassword(req.body)),
    );

    router.post(
      '/refresh',
      this._getValidationMiddleware({ body: refreshTokensBodySchema }),
      this._run((req) => this._tokenService.refreshTokens(req.body)),
    );

    router.post(
      '/log-out',
      this._run((req: IRequestWithUser) =>
        this._authService.logOut(req.userId),
      ),
    );

    router.post(
      '/log-in/google',
      this._getValidationMiddleware({ body: logInGoogleBodySchema }),
      this._run((req) => this._authService.logInGoogle(req.body)),
    );

    router.get(
      '/log-in/google',
      this._run(() => this._authService.getLogInGoogleUrl()),
    );

    return router;
  }
}

export { Auth };
