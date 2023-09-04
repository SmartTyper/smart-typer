import { HttpMethod, RequestContentType } from 'common/enums/enums';
import {
  ResetPasswordRequestDto,
  SetPasswordRequestDto,
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
      contentType: RequestContentType.JSON,
    });
  }

  public async register(
    payload: RegisterRequestDto,
  ): Promise<UserAuthInfoResponseDto> {
    return this._httpService.load(`${this._baseUrl}/register`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: RequestContentType.JSON,
    });
  }

  public async resetPassword(payload: ResetPasswordRequestDto): Promise<void> {
    return this._httpService.load(`${this._baseUrl}/reset-password`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: RequestContentType.JSON,
    });
  }

  public async setPassword(
    payload: SetPasswordRequestDto,
  ): Promise<UserAuthInfoResponseDto> {
    return this._httpService.load(`${this._baseUrl}/set-password`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: RequestContentType.JSON,
    });
  }

  public async logOut(): Promise<void> {
    return this._httpService.load(`${this._baseUrl}/log-out`, {
      method: HttpMethod.POST,
    });
  }

  public async getLogInGoogleUrl(): Promise<GoogleLogInUrlResponseDto> {
    return this._httpService.load(`${this._baseUrl}/log-in/google`);
  }

  public async logInGoogle(
    payload: GoogleLogInCodeRequestDto,
  ): Promise<UserAuthInfoResponseDto> {
    return this._httpService.load(`${this._baseUrl}/log-in/google`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: RequestContentType.JSON,
    });
  }
}

export { AuthApi };
