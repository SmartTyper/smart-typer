import { HttpCode, HttpErrorMessage } from 'common/enums/enums';
import {
  IUser,
  IUserWithPassword,
  IUserWithTokens,
} from 'common/interfaces/interfaces';
import { CreateUserRequestDto } from 'common/types/types';
import { user as userRepository } from 'data/repositories/repositories';
import { HttpError } from 'exceptions/exceptions';
import { token as tokenService, s3 as s3Service } from 'services/services';

type Constructor = {
  userRepository: typeof userRepository;
  tokenService: typeof tokenService;
  s3Service: typeof s3Service;
};

class User {
  private _userRepository: typeof userRepository;
  private _tokenService: typeof tokenService;
  private _s3Service: typeof s3Service;

  public constructor(params: Constructor) {
    this._userRepository = params.userRepository;
    this._tokenService = params.tokenService;
    this._s3Service = params.s3Service;
  }

  private async _getFullInfo(user: IUser): Promise<IUserWithTokens> {
    const photoUrl = user.photoUrl
      ? await this._s3Service.getSignedUrl(user.photoUrl)
      : user.photoUrl;
    const tokens = await this._tokenService.getTokens(user.id);
    return {
      ...user,
      ...tokens,
      photoUrl,
    };
  }

  public async getFullInfoByEmail(email: string): Promise<IUserWithTokens> {
    const user = await this.getByEmail(email);
    return this._getFullInfo(user);
  }

  public async getFullInfoById(userId: number): Promise<IUserWithTokens> {
    const user = await this._userRepository.getById(userId);
    if (!user) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.INVALID_LOG_IN_DATA,
      });
    }
    return this._getFullInfo(user);
  }

  public async getByEmail(email: string): Promise<IUserWithPassword> {
    const user = await this._userRepository.getByEmail(email);
    if (!user) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.INVALID_LOG_IN_DATA,
      });
    }
    return user;
  }

  public async create(data: CreateUserRequestDto): Promise<IUserWithTokens> {
    const { nickname, email, photoUrl, password } = data;
    const userData = {
      email,
      nickname,
      password: password ?? null,
      photoUrl: photoUrl ?? null,
    };
    const newUser = await this._userRepository.create(userData);

    return this.getFullInfoByEmail(newUser.email);
  }

  public async patchById(
    userId: number,
    data: Partial<IUserWithPassword>,
  ): Promise<IUser> {
    return this._userRepository.patchById(userId, data);
  }
}

export { User };
