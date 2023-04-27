import { HttpCode, HttpErrorMessage } from 'common/enums/enums';
import {
  User as UserBase,
  UserWithPassword,
  CreateUserRequestDto,
  UserWithTokensAndSettingsResponseDto,
  UserWithStatisticsAndRatingResponseDto,
} from 'common/types/types';
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

  private async _getWithTokensAndSettings(
    user: UserBase,
  ): Promise<UserWithTokensAndSettingsResponseDto> {
    const photoUrl = user.photoUrl
      ? await this._s3Service.getSignedUrl(user.photoUrl)
      : user.photoUrl;
    const tokens = await this._tokenService.getTokens(user.id);
    const settings = {
      countdownBeforeGame: 10,
      gameTime: 60,
      isShownInRating: true,
      hasGameVoice: true,
      hasEmailNotifications: true,
      hasLessonVoice: true,
    };
    return {
      ...user,
      ...tokens,
      photoUrl,
      settings,
    };
  }

  public async getWithTokensAndSettingsByEmail(
    email: string,
  ): Promise<UserWithTokensAndSettingsResponseDto> {
    const user = await this.getByEmail(email);
    return this._getWithTokensAndSettings(user);
  }

  public async getWithTokensAndSettingsById(
    userId: number,
  ): Promise<UserWithTokensAndSettingsResponseDto> {
    const user = await this._userRepository.getById(userId);
    if (!user) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.INVALID_LOG_IN_DATA,
      });
    }
    return this._getWithTokensAndSettings(user);
  }

  public async getByEmail(email: string): Promise<UserWithPassword> {
    const user = await this._userRepository.getByEmail(email);
    if (!user) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.INVALID_LOG_IN_DATA,
      });
    }
    return user;
  }

  public async create(
    data: CreateUserRequestDto,
  ): Promise<UserWithTokensAndSettingsResponseDto> {
    const { nickname, email, photoUrl, password } = data;
    const userData = {
      email,
      nickname,
      password: password ?? null,
      photoUrl: photoUrl ?? null,
    };
    const newUser = await this._userRepository.create(userData);

    return this.getWithTokensAndSettingsByEmail(newUser.email);
  }

  public async patchById(
    userId: number,
    data: Partial<UserWithPassword>,
  ): Promise<UserBase> {
    return this._userRepository.patchById(userId, data);
  }

  public async getWithStatisticsAndRatingById(
    userId: number,
  ): Promise<UserWithStatisticsAndRatingResponseDto> {
    console.log(userId);
    return {
      id: 2,
      nickname: 'nickname2',
      email: 'email2',
      photoUrl: null,
      statistics: {
        totalTime: 10,
        todayTime: 10,
        totalLessons: 10,
        todayLessons: 10,
        topSpeed: 10,
        todayTopSpeed: 10,
        averageSpeed: 10,
        todayAverageSpeed: 10,
      },
      rating: [
        {
          nickname: 'nickname3',
          photoUrl: null,
          id: 3,
          averageSpeed: 20,
        },
        {
          nickname: 'nickname4',
          photoUrl: null,
          id: 4,
          averageSpeed: 30,
        },
      ],
    };
  }
}

export { User };
