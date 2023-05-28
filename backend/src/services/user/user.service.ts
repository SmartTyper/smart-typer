import { basename } from 'path';
import { HttpCode, HttpErrorMessage, UserKey } from 'common/enums/enums';
import {
  UserDto,
  UserWithPassword,
  CreateUserRequestDto,
  UserAuthInfoResponseDto,
  UserProfileInfoResponseDto,
  TokensResponseDto,
  UpdateAvatarResponseDto,
  UserToRoom,
  Skill,
} from 'common/types/types';
import { user as userRepository } from 'data/repositories/repositories';
import { HttpError } from 'exceptions/exceptions';
import { token as tokenService, s3 as s3Service } from 'services/services';
import { IUserToSkillRecord } from 'common/interfaces/interfaces';

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

  private async _addPhotoUrlAndTokens(
    user: Omit<UserAuthInfoResponseDto, keyof TokensResponseDto>,
  ): Promise<UserAuthInfoResponseDto> {
    const isGoogleUrl = user?.photoUrl?.match(/google/i);

    const photoUrl = !user.photoUrl
      ? null
      : isGoogleUrl
        ? user.photoUrl
        : await this._s3Service.getSignedUrl(user.photoUrl);

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
    console.log(user);

    if (!user) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
      });
    }

    return user;
  }

  //refactor result
  public create(data: CreateUserRequestDto): Promise<UserWithPassword> {
    const { nickname, email, photoUrl, password } = data;
    const userData = {
      email,
      nickname,
      password: password ?? null,
      photoUrl: photoUrl ?? null,
    };
    return this._userRepository.create(userData);
  }

  public async patchById(
    userId: number,
    data: Partial<Pick<UserDto, UserKey.NICKNAME | UserKey.EMAIL>>,
  ): Promise<UserDto> {
    return this._userRepository.patchById(userId, data);
  }

  public async updatePasswordById(
    userId: number,
    data: Pick<UserWithPassword, UserKey.PASSWORD>,
  ): Promise<UserDto> {
    return this._userRepository.patchById(userId, data);
  }

  public async getProfileInfoById(
    userId: number,
  ): Promise<UserProfileInfoResponseDto> {
    const userWithStatistics = await this._userRepository.getByIdWithStatistics(
      userId,
    );
    if (!userWithStatistics) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
      });
    }
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
        await this._s3Service.deleteInS3(fileName);
      }
    }

    const uploadedFile = await this._s3Service.uploadToS3(userId, file);
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

  public async updateCurrentRoomByUserId(
    userId: number,
    roomId: number | null,
  ): Promise<Omit<UserToRoom, 'personalRoomId'>> {
    return this._userRepository.updateCurrentRoomByUserId(userId, roomId);
  }

  public async getCurrentSkillLevelsByUserId(
    userId: number,
  ): Promise<Omit<Skill, 'name'>[]> {
    const currentSkillLevels =
      await this._userRepository.getCurrentSkillLevelsByUserId(userId);

    if (!currentSkillLevels) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
      });
    }

    return currentSkillLevels;
  }

  public async updateSkillLevelsByUserId(
    userId: number,
    payload: Omit<Skill, 'name'>[],
  ): Promise<Omit<IUserToSkillRecord, 'userId'>[]> {
    return this._userRepository.patchSkillLevelsByUserId(userId, payload);
  }
}

export { User };
