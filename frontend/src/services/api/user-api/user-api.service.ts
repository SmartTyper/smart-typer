import { HttpMethod, RequestContentType } from 'common/enums/enums';
import {
  UpdateAvatarResponseDto,
  UserDto,
  UserIdDto,
  UserProfileInfoResponseDto,
  UserAuthInfoResponseDto,
} from 'common/types/types';
import { Http as HttpService } from '../../http/http.service';

type Constructor = {
  httpService: HttpService;
};

class UserApi {
  private _httpService: HttpService;
  private _baseUrl = '/api/users';

  public constructor(params: Constructor) {
    this._httpService = params.httpService;
  }

  public async getAuthInfo(): Promise<UserAuthInfoResponseDto> {
    return this._httpService.load(`${this._baseUrl}/current`);
  }

  public async getProfileInfo(
    userId: UserIdDto,
  ): Promise<UserProfileInfoResponseDto> {
    return this._httpService.load(`${this._baseUrl}/${userId}`);
  }

  public async updateInfo(payload: Partial<UserDto>): Promise<void> {
    return this._httpService.load(`${this._baseUrl}/current`, {
      method: HttpMethod.PUT,
      payload: JSON.stringify(payload),
      contentType: RequestContentType.JSON,
    });
  }

  public async updateAvatar(file: File): Promise<UpdateAvatarResponseDto> {
    const fd = new FormData();
    fd.append('image', file, file.name);

    return this._httpService.load(`${this._baseUrl}/current/avatar`, {
      method: HttpMethod.PUT,
      payload: fd,
      contentType: RequestContentType.JSON,
    });
  }

  public async deleteAvatar(): Promise<void> {
    return this._httpService.load(`${this._baseUrl}/current/avatar`, {
      method: HttpMethod.DELETE,
    });
  }
}

export { UserApi };
