import { HttpMethod, ContentType } from 'common/enums/enums';
import {
  ResetPasswordRequestDto,
  SetPasswordRequestDto,
  RefreshTokenRequestDto,
  LoginUserRequestDto,
  RegisterUserRequestDto,
  GoogleLoginUrlResponseDto,
  GoogleLoginCodeRequestDto,
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

  public async loginUser(
    loginPayload: LoginUserRequestDto,
  ): Promise<IUserWithTokens> {
    const loginResponse: IUserWithTokens = await this._httpService.load(
      `${this._baseUrl}/login`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(loginPayload),
        contentType: ContentType.JSON,
      },
    );

    return loginResponse;
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

  public async setPassword(payload: SetPasswordRequestDto): Promise<void> {
    return this._httpService.load(`${this._baseUrl}/set-password`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async logout(payload: RefreshTokenRequestDto): Promise<void> {
    return this._httpService.load(`${this._baseUrl}/logout`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async getLoginGoogleUrl(): Promise<GoogleLoginUrlResponseDto> {
    return this._httpService.load(`${this._baseUrl}/login/google`);
  }

  public async loginGoogle(
    payload: GoogleLoginCodeRequestDto,
  ): Promise<IUserWithTokens> {
    return this._httpService.load(`${this._baseUrl}/login/google`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }
}

export { AuthApi };
