import { Router } from 'express';
import { getValidationMiddleware } from 'api/middlewares/middlewares';
import { auth as authService, token as tokenService } from 'services/services';
import {
  signUpSchema,
  logInSchema,
  resetPasswordSchema,
  setPasswordSchema,
  refreshTokenSchema,
  logInGoogleSchema,
} from 'validation-schemas/validation-schemas';
import { Abstract } from '../abstract/abstract.route';

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
      this._getValidationMiddleware({ body: signUpSchema }),
      this._run((req) => this._authService.register(req.body)),
    );

    router.post(
      '/log-in',
      this._getValidationMiddleware({ body: logInSchema }),
      this._run((req) => this._authService.logIn(req.body)),
    );

    router.post(
      '/reset-password',
      this._getValidationMiddleware({ body: resetPasswordSchema }),
      this._run((req) => this._authService.resetPassword(req.body)),
    );

    router.post(
      '/set-password',
      this._getValidationMiddleware({ body: setPasswordSchema }),
      this._run((req) => this._authService.setPassword(req.body)),
    );

    router.post(
      '/refresh',
      this._getValidationMiddleware({ body: refreshTokenSchema }),
      this._run((req) => this._tokenService.refreshTokens(req.body)),
    );

    router.post(
      '/log-out',
      this._getValidationMiddleware({ body: refreshTokenSchema }),
      this._run((req) => this._authService.logOut(req.body)),
    );

    router.post(
      '/logIn/google',
      this._getValidationMiddleware({ body: logInGoogleSchema }),
      this._run((req) => this._authService.logInGoogle(req.body)),
    );

    router.get(
      '/logIn/google',
      this._run(() => this._authService.getLogInGoogleUrl()),
    );

    return router;
  }
}

export { Auth };
