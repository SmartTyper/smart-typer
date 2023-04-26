import { HttpMethod, ContentType } from 'common/enums/enums';
import {
  ResetPasswordRequestDto,
  SetPasswordRequestDto,
  RefreshTokenRequestDto,
  LogInUserRequestDto,
  RegisterUserRequestDto,
  GoogleLogInUrlResponseDto,
  GoogleLogInCodeRequestDto,
} from 'common/types/types';
import { IUserWithTokens } from 'common/interfaces/interfaces';
import { http as httpService } from 'services/services';

type Constructor = {
  httpService: typeof httpService;
};

class AuthApi {
  private _httpService: typeof httpService;
  private _baseUrl = '/api/auth';

  public constructor(params: Constructor) {
    this._httpService = params.httpService;
  }

  public async logInUser(
    logInPayload: LogInUserRequestDto,
  ): Promise<IUserWithTokens> {
    const logInResponse: IUserWithTokens = await this._httpService.load(
      `${this._baseUrl}/log-in`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(logInPayload),
        contentType: ContentType.JSON,
      },
    );

    return logInResponse;
  }

  public async registerUser(
    registerPayload: RegisterUserRequestDto,
  ): Promise<IUserWithTokens> {
    const registerResponse: IUserWithTokens = await this._httpService.load(
      `${this._baseUrl}/register`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(registerPayload),
        contentType: ContentType.JSON,
      },
    );

    return registerResponse;
  }

  public async resetPassword(payload: ResetPasswordRequestDto): Promise<void> {
    return this._httpService.load(`${this._baseUrl}/reset-password`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async setPassword(
    payload: SetPasswordRequestDto,
  ): Promise<IUserWithTokens> {
    return this._httpService.load(`${this._baseUrl}/set-password`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async logOut(payload: RefreshTokenRequestDto): Promise<void> {
    return this._httpService.load(`${this._baseUrl}/log-out`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async getLogInGoogleUrl(): Promise<GoogleLogInUrlResponseDto> {
    return this._httpService.load(`${this._baseUrl}/logIn/google`);
  }

  public async logInGoogle(
    payload: GoogleLogInCodeRequestDto,
  ): Promise<IUserWithTokens> {
    return this._httpService.load(`${this._baseUrl}/logIn/google`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }
}

export { AuthApi };
