import {
  CRON_JOB_RULE,
  ENV,
  MAX_USERS_IN_ROOM,
} from 'common/constants/constants';
import {
  CommonKey,
  HttpCode,
  HttpErrorMessage,
  SocketEvent,
} from 'common/enums/enums';
import {
  CreateRoomRequestDto,
  RoomDto,
  SendRoomUrlToEmailsRequestDto,
  ShareRoomUrlDto,
  CreateRoomResponseDto,
  UserDto,
} from 'common/types/types';
import { room as roomRepository } from 'data/repositories/repositories';
import { HttpError } from 'exceptions/exceptions';
import {
  socket as socketService,
  user as userService,
  mailer as mailerService,
  cron as cronService,
} from 'services/services';

type Constructor = {
  roomRepository: typeof roomRepository;
  socketService: typeof socketService;
  userService: typeof userService;
  mailerService: typeof mailerService;
  cronService: typeof cronService;
};

class Room {
  private _roomRepository: typeof roomRepository;
  private _socketService: typeof socketService;
  private _userService: typeof userService;
  private _mailerService: typeof mailerService;
  private _cronService: typeof cronService;

  public constructor(params: Constructor) {
    this._roomRepository = params.roomRepository;
    this._socketService = params.socketService;
    this._userService = params.userService;
    this._mailerService = params.mailerService;
    this._cronService = params.cronService;
    this._deleteUnused();
  }

  private async _deleteUnused(): Promise<void> {
    this._cronService.scheduleJob({
      rule: CRON_JOB_RULE,
      callback:
        this._roomRepository.deleteCreatedBeforeTodayWithoutParticipants.bind(
          this._roomRepository,
        ),
    });
  }

  public async get(roomId: RoomDto[CommonKey.ID]): Promise<RoomDto> {
    const room = await this._roomRepository.getById(roomId);

    if (!room) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
      });
    }
    return room;
  }

  public async getAllAvailable(): Promise<RoomDto[]> {
    return this._roomRepository.getAllAvailable();
  }

  public async create(
    payload: CreateRoomRequestDto,
  ): Promise<CreateRoomResponseDto> {
    const createdRoom = await this._roomRepository.create(payload);

    if (!payload.isPrivate) {
      this._socketService.io.emit(SocketEvent.CREATE_ROOM, createdRoom);
    }
    return createdRoom;
  }

  public async getShareUrl(
    roomId: RoomDto[CommonKey.ID],
  ): Promise<ShareRoomUrlDto> {
    const room = await this._roomRepository.getById(roomId);
    if (!room) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
      });
    }
    const url = `${ENV.APP.URL}/rooms/${roomId}`;
    return { url };
  }

  public async sendShareUrlToEmails(
    userId: UserDto[CommonKey.ID],
    payload: SendRoomUrlToEmailsRequestDto,
  ): Promise<void> {
    const user = await this._userService.get(userId);
    if (!user) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
      });
    }
    const { emails, shareRoomUrl } = payload;
    await this._mailerService.sendMail({
      to: emails,
      subject: `${user.nickname} shared an Key Racing room with you`,
      text: shareRoomUrl,
    });
  }

  public async addParticipant(
    roomId: RoomDto[CommonKey.ID],
    userId: UserDto[CommonKey.ID],
  ): Promise<void> {
    const user = await this._userService.get(userId);
    const { currentRoomId } = await this._userService.getCurrentRoomId(userId);
    if (currentRoomId) {
      throw new HttpError({
        status: HttpCode.CONFLICT,
        message: HttpErrorMessage.USER_ALREADY_IN_ROOM,
      });
    }

    const { count, id: fetchedRoomId } =
      (await this._roomRepository.getParticipantsCountById(roomId)) ?? {};
    const participantsCount = Number(count);

    if (!fetchedRoomId) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
      });
    } else if (participantsCount >= MAX_USERS_IN_ROOM) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.MAX_COUNT_OF_USERS,
      });
    }

    const { userId: ownerId } =
      (await this._roomRepository.getOwnerIdByPersonalRoomId(roomId)) ?? {};

    if (userId !== ownerId && ownerId) {
      throw new HttpError({
        status: HttpCode.FORBIDDEN,
        message: HttpErrorMessage.JOIN_PERSONAL_ROOM,
      });
    }

    await this._userService.updateCurrentRoom(userId, roomId);

    const participant = {
      id: user.id,
      nickname: user.nickname,
      photoUrl: user.photoUrl,
    };
    this._socketService.io
      .to(String(roomId))
      .emit(SocketEvent.ADD_PARTICIPANT, participant);
  }

  public async removeParticipant(
    roomId: RoomDto[CommonKey.ID],
    userId: number,
  ): Promise<void> {
    const participant = await this._userService.get(userId);

    const { currentRoomId } = await this._userService.getCurrentRoomId(userId);
    if (currentRoomId !== roomId) {
      throw new HttpError({
        status: HttpCode.CONFLICT,
        message: HttpErrorMessage.USER_NOT_IN_ROOM,
      });
    }

    const { count, id: fetchedRoomId } =
      (await this._roomRepository.getParticipantsCountById(roomId)) ?? {};
    const participantsCount = Number(count);

    if (!fetchedRoomId) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
      });
    }

    const { userId: ownerId } =
      (await this._roomRepository.getOwnerIdByPersonalRoomId(roomId)) ?? {};

    await this._userService.updateCurrentRoom(userId, null);

    this._socketService.io
      .to(String(roomId))
      .emit(SocketEvent.REMOVE_PARTICIPANT, { participantId: participant.id });

    if (participantsCount === 1 && !ownerId) {
      this._socketService.io.emit(SocketEvent.DELETE_ROOM, { roomId });
      await this._roomRepository.removeById(roomId);
    }
  }
}

export { Room };
