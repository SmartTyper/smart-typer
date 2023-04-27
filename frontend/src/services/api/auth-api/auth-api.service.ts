import { HttpMethod, ContentType } from 'common/enums/enums';
import {
  ResetPasswordRequestDto,
  SetPasswordRequestDto,
  RefreshTokenRequestDto,
  LogInUserRequestDto,
  RegisterUserRequestDto,
  GoogleLogInUrlResponseDto,
  GoogleLogInCodeRequestDto,
  UserWithTokensAndSettingsResponseDto,
} from 'common/types/types';
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
    payload: LogInUserRequestDto,
  ): Promise<UserWithTokensAndSettingsResponseDto> {
    return this._httpService.load(`${this._baseUrl}/log-in`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async registerUser(
    payload: RegisterUserRequestDto,
  ): Promise<UserWithTokensAndSettingsResponseDto> {
    return this._httpService.load(`${this._baseUrl}/register`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
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
  ): Promise<UserWithTokensAndSettingsResponseDto> {
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
  ): Promise<UserWithTokensAndSettingsResponseDto> {
    return this._httpService.load(`${this._baseUrl}/logIn/google`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }
}

export { AuthApi };
