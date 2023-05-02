import { basename } from 'path';
import { HttpCode, HttpErrorMessage } from 'common/enums/enums';
import {
  UserDto,
  UserWithPassword,
  CreateUserRequestDto,
  UserAuthInfoResponseDto,
  UserProfileInfoResponseDto,
} from 'common/types/types';
import { user as userRepository } from 'data/repositories/repositories';
import { HttpError } from 'exceptions/exceptions';
import { token as tokenService, s3 as s3Service } from 'services/services';
import { UpdateAvatarResponseDto } from 'smart-typer-shared/common/types/types';

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

  private async _getAuthInfo(user: UserDto): Promise<UserAuthInfoResponseDto> {
    const photoUrl = user.photoUrl
      ? await this._s3Service.getSignedUrl(user.photoUrl)
      : user.photoUrl;
    const tokens = await this._tokenService.getTokens(user.id);
    const settings = {
      countdownBeforeGame: 10,
      gameTime: 60,
      isShownInRating: true,
      isSoundTurnedOn: true,
      hasEmailNotifications: true,
    };
    const personalRoom = {
      id: 1,
      lessonId: null,
      name: 'personal',
      participants: [user],
    };
    return {
      ...user,
      ...tokens,
      photoUrl,
      settings,
      personalRoom,
    };
  }

  public async getAuthInfoByEmail(
    email: string,
  ): Promise<UserAuthInfoResponseDto> {
    const user = await this.getByEmail(email);
    return this._getAuthInfo(user);
  }

  public async getAuthInfoById(
    userId: number,
  ): Promise<UserAuthInfoResponseDto> {
    const user = await this._userRepository.getById(userId);
    if (!user) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.INVALID_LOG_IN_DATA,
      });
    }
    return this._getAuthInfo(user);
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
  ): Promise<UserAuthInfoResponseDto> {
    const { nickname, email, photoUrl, password } = data;
    const userData = {
      email,
      nickname,
      password: password ?? null,
      photoUrl: photoUrl ?? null,
    };
    const newUser = await this._userRepository.create(userData);

    return this.getAuthInfoByEmail(newUser.email);
  }

  public async updateById(
    userId: number,
    data: Partial<UserWithPassword>,
  ): Promise<UserDto> {
    return this._userRepository.patchById(userId, data);
  }

  public async getProfileInfoById(
    userId: number,
  ): Promise<UserProfileInfoResponseDto> {
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

  public async updateAvatar(
    userId: number,
    file?: Express.Multer.File,
  ): Promise<UpdateAvatarResponseDto> {
    if (!file) {
      throw new HttpError({
        status: HttpCode.UNPROCESSABLE_ENTITY,
        message: HttpErrorMessage.NO_FILE,
      });
    }

    const userToUpdate = await this._userRepository.getById(userId);
    if (!userToUpdate) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
      });
    }

    const { photoUrl } = userToUpdate;
    if (photoUrl) {
      const fileName = basename(photoUrl);
      const isExistsAvatar = await this._s3Service.doesFileExistInS3(fileName);
      if (isExistsAvatar) {
        await this._s3Service.deleteInS3(photoUrl);
      }
    }

    const uploadedFile = await this._s3Service.uploadToS3(file);
    const { Location: location } = uploadedFile;
    await this._userRepository.patchById(userId, {
      photoUrl: location,
    });

    const newPhotoUrl = await this._s3Service.getSignedUrl(location);
    return { photoUrl: newPhotoUrl };
  }

  public async deleteAvatar(userId: number): Promise<void> {
    const userToUpdate = await this._userRepository.getById(userId);
    if (!userToUpdate) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
      });
    }
    const { photoUrl } = userToUpdate;
    if (photoUrl) {
      const fileName = basename(photoUrl);
      const isExistsAvatar = await this._s3Service.doesFileExistInS3(fileName);
      if (isExistsAvatar) {
        await this._s3Service.deleteInS3(photoUrl);
      }
      await this._userRepository.patchById(userId, { photoUrl: null });
    }
  }
}

export { User };
