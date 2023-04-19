import { HttpCode, HttpErrorMessage } from 'common/enums/enums';
import { IGoogleUser, IUserWithTokens } from 'common/interfaces/interfaces';
import {
  LoginUserRequestDto,
  RegisterUserRequestDto,
  RefreshTokenRequestDto,
  ResetPasswordRequestDto,
  SetPasswordRequestDto,
  GoogleLoginUrlResponseDto,
  GoogleLoginCodeRequestDto,
} from 'common/types/types';
import { HttpError } from 'exceptions/exceptions';
import {
  hash as hashService,
  user as userService,
  token as tokenService,
  mailer as mailerService,
  oauth2 as oauth2Service,
} from 'services/services';

type Constructor = {
  userService: typeof userService;
  hashService: typeof hashService;
  tokenService: typeof tokenService;
  mailerService: typeof mailerService;
  oauth2Service: typeof oauth2Service;
  appUrl: string;
};

class Auth {
  private _userService: typeof userService;
  private _hashService: typeof hashService;
  private _tokenService: typeof tokenService;
  private _mailerService: typeof mailerService;
  private _oauth2Service: typeof oauth2Service;
  private _appUrl: string;

  public constructor(params: Constructor) {
    this._userService = params.userService;
    this._hashService = params.hashService;
    this._tokenService = params.tokenService;
    this._mailerService = params.mailerService;
    this._oauth2Service = params.oauth2Service;
    this._appUrl = params.appUrl;
  }

  public async register(
    userInfo: RegisterUserRequestDto,
  ): Promise<IUserWithTokens> {
    const existingUser = await this._userService.getByEmail(userInfo.email);

    if (existingUser) {
      throw new HttpError({
        status: HttpCode.CONFLICT,
        message: HttpErrorMessage.EMAIL_ALREADY_EXISTS,
      });
    }

    const hashedPassword = await this._hashService.hash(userInfo.password);
    const email = userInfo.email;

    return this._userService.create({
      ...userInfo,
      email,
      password: hashedPassword,
    });
  }

  public async login(body: LoginUserRequestDto): Promise<IUserWithTokens> {
    const user = await this._userService.getByEmail(body.email);
    if (!user || !user.password) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.INVALID_LOGIN_DATA,
      });
    }

    const isPasswordCorrect = await this._hashService.verify(
      body.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.INVALID_LOGIN_DATA,
      });
    }

    return this._userService.getFullInfoByEmail(user.email);
  }

  public async resetPassword(body: ResetPasswordRequestDto): Promise<void> {
    const user = await this._userService.getByEmail(body.email);
    if (!user) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.NO_SUCH_EMAIL,
      });
    }

    const { accessToken } = this._tokenService.generateTokens(user.id);
    const url = `${this._appUrl}/set-password?token=${accessToken}`;
    await this._mailerService.sendMail({
      to: user.email,
      subject: 'Reset Password',
      text: url,
    });
  }

  public async setPassword(body: SetPasswordRequestDto): Promise<void> {
    const { token, password } = body;
    if (!token) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.INVALID_TOKEN,
      });
    }

    const decoded = this._tokenService.verifyToken(token);

    const hashedPassword = await this._hashService.hash(password);
    await this._userService.patchById(decoded.userId, {
      password: hashedPassword,
    });
  }

  public async logout(body: RefreshTokenRequestDto): Promise<void> {
    const { refreshToken } = body;
    await this._tokenService.removeRefreshToken(refreshToken);
  }

  public async getLoginGoogleUrl(): Promise<GoogleLoginUrlResponseDto> {
    const url = this._oauth2Service.generateAuthUrl();
    return { url };
  }

  public async loginGoogle({
    code,
  }: GoogleLoginCodeRequestDto): Promise<IUserWithTokens> {
    const idToken = await this._oauth2Service.getIdToken(code);
    if (!idToken) {
      throw new HttpError({
        status: HttpCode.UNAUTHORIZED,
        message: HttpErrorMessage.UNAUTHORIZED,
      });
    }
    const decodedToken = this._tokenService.decodeToken(idToken);
    const { email, name, picture } = decodedToken as unknown as IGoogleUser;
    const user = await this._userService.getFullInfoByEmail(email);
    if (user) {
      return user;
    }
    return this._userService.create({
      nickname: name,
      email,
      photoUrl: picture,
    });
  }
}

export { Auth };
