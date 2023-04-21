import { Router } from 'express';
import { getValidationMiddleware } from 'api/middlewares/middlewares';
import { auth as authService, token as tokenService } from 'services/services';
import {
  signUpSchema,
  loginSchema,
  resetPasswordSchema,
  setPasswordSchema,
  refreshTokenSchema,
  loginGoogleSchema,
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
      '/login',
      this._getValidationMiddleware({ body: loginSchema }),
      this._run((req) => this._authService.login(req.body)),
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
      '/logout',
      this._getValidationMiddleware({ body: refreshTokenSchema }),
      this._run((req) => this._authService.logout(req.body)),
    );

    router.post(
      '/login/google',
      this._getValidationMiddleware({ body: loginGoogleSchema }),
      this._run((req) => this._authService.loginGoogle(req.body)),
    );

    router.get(
      '/login/google',
      this._run(() => this._authService.getLoginGoogleUrl()),
    );

    return router;
  }
}

export { Auth };
