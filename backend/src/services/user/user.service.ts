import { basename } from 'path';
import { HttpCode, HttpErrorMessage } from 'common/enums/enums';
import {
  UserDto,
  UserWithPassword,
  CreateUserRequestDto,
  UserAuthInfoResponseDto,
  UserProfileInfoResponseDto,
  TokensResponseDto,
  UpdateAvatarResponseDto,
} from 'common/types/types';
import { user as userRepository } from 'data/repositories/repositories';
import { HttpError } from 'exceptions/exceptions';
import {
  token as tokenService,
  s3 as s3Service,
  // userToRoom as userToRoomService,
} from 'services/services';

type Constructor = {
  userRepository: typeof userRepository;
  tokenService: typeof tokenService;
  s3Service: typeof s3Service;
  // userToRoomService: typeof userToRoomService;
};

class User {
  private _userRepository: typeof userRepository;
  private _tokenService: typeof tokenService;
  private _s3Service: typeof s3Service;
  // private _userToRoomService: typeof userToRoomService;

  public constructor(params: Constructor) {
    this._userRepository = params.userRepository;
    this._tokenService = params.tokenService;
    this._s3Service = params.s3Service;
    // this._userToRoomService = params.userToRoomService;
  }

  private async _addPhotoUrlAndTokens(
    user: Omit<UserAuthInfoResponseDto, keyof TokensResponseDto>,
  ): Promise<UserAuthInfoResponseDto> {
    const photoUrl = user.photoUrl
      ? await this._s3Service.getSignedUrl(user.photoUrl)
      : null;
    const tokens = await this._tokenService.getTokens(user.id);
    return {
      ...user,
      ...tokens,
      photoUrl,
    };
  }

  public async getAuthInfoByEmail(
    email: string,
  ): Promise<UserAuthInfoResponseDto> {
    const user =
      await this._userRepository.getByEmailWithSettingsAndPersonalRoom(email);
    if (!user) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_SUCH_EMAIL,
      });
    }
    return this._addPhotoUrlAndTokens(user);
  }

  public async getAuthInfoById(
    userId: number,
  ): Promise<UserAuthInfoResponseDto> {
    const user = await this._userRepository.getByIdWithSettingsAndPersonalRoom(
      userId,
    );
    if (!user) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
      });
    }
    return this._addPhotoUrlAndTokens(user);
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
    const userWithStatistics = await this._userRepository.getByIdWithStatistics(
      userId,
    );
    const rating = await this._userRepository.getRating();
    return {
      ...userWithStatistics,
      rating,
    };
  }

  public async getById(userId: number): Promise<UserDto> {
    const user = await this._userRepository.getById(userId);
    if (!user) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.INVALID_LOG_IN_DATA,
      });
    }
    return user;
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

    const userToUpdate = await this.getById(userId);
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
    const userToUpdate = await this.getById(userId);
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
