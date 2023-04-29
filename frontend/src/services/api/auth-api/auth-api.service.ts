import { HttpMethod, ContentType } from 'common/enums/enums';
import {
  ResetPasswordRequestDto,
  SetPasswordRequestDto,
  RefreshTokenRequestDto,
  LogInRequestDto,
  RegisterRequestDto,
  GoogleLogInUrlResponseDto,
  GoogleLogInCodeRequestDto,
  UserAuthInfoResponseDto,
} from 'common/types/types';
import { Http as HttpService } from '../../http/http.service';

type Constructor = {
  httpService: HttpService;
};

class AuthApi {
  private _httpService: HttpService;
  private _baseUrl = '/api/auth';

  public constructor(params: Constructor) {
    this._httpService = params.httpService;
  }

  public async logIn(
    payload: LogInRequestDto,
  ): Promise<UserAuthInfoResponseDto> {
    return this._httpService.load(`${this._baseUrl}/log-in`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async register(
    payload: RegisterRequestDto,
  ): Promise<UserAuthInfoResponseDto> {
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
  ): Promise<UserAuthInfoResponseDto> {
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
  ): Promise<UserAuthInfoResponseDto> {
    return this._httpService.load(`${this._baseUrl}/logIn/google`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }
}

export { AuthApi };
