import { basename } from 'path';
import {
  CommonKey,
  HttpCode,
  HttpErrorMessage,
  SkillKey,
  UserKey,
  UserToRoomKey,
  UserToSkillKey,
} from 'common/enums/enums';
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
  RoomDto,
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
    userId: UserDto[CommonKey.ID],
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
    userId: UserDto[CommonKey.ID],
    data: Partial<Pick<UserDto, UserKey.NICKNAME | UserKey.EMAIL>>,
  ): Promise<UserDto> {
    if (data.email) {
      const userWithEmail = await this._userRepository.getByEmail(data.email);
      if (userWithEmail) {
        throw new HttpError({
          status: HttpCode.CONFLICT,
          message: HttpErrorMessage.EMAIL_ALREADY_EXISTS,
        });
      }
    }
    return this._userRepository.patchById(userId, data);
  }

  public async updatePasswordById(
    userId: UserDto[CommonKey.ID],
    data: Pick<UserWithPassword, UserKey.PASSWORD>,
  ): Promise<UserDto> {
    return this._userRepository.patchById(userId, data);
  }

  public async getProfileInfoById(
    userId: UserDto[CommonKey.ID],
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

  public async getById(userId: UserDto[CommonKey.ID]): Promise<UserDto> {
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
    userId: UserDto[CommonKey.ID],
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

  public async deleteAvatar(userId: UserDto[CommonKey.ID]): Promise<void> {
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
      await this._userRepository.patchById(userId, { photoUrl: null });
    }
  }

  public async updateCurrentRoomByUserId(
    userId: UserDto[CommonKey.ID],
    roomId: RoomDto[CommonKey.ID] | null,
  ): Promise<Omit<UserToRoom, UserToRoomKey.PERSONAL_ROOM_ID>> {
    return this._userRepository.updateCurrentRoomByUserId(userId, roomId);
  }

  public async getCurrentSkillLevelsByUserId(
    userId: UserDto[CommonKey.ID],
  ): Promise<Omit<Skill, SkillKey.NAME>[]> {
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
    userId: UserDto[CommonKey.ID],
    payload: Omit<Skill, SkillKey.NAME>[],
  ): Promise<Omit<IUserToSkillRecord, UserToSkillKey.USER_ID>[]> {
    return this._userRepository.patchSkillLevelsByUserId(userId, payload);
  }
}

export { User };
