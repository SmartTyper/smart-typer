import { ENV, MAX_USERS_IN_ROOM } from 'common/constants/constants';
import { HttpCode, HttpErrorMessage, SocketEvent } from 'common/enums/enums';
import {
  CreateRoomRequestDto,
  RoomDto,
  ParticipantIdDto,
  SendRoomUrlToEmailsRequestDto,
  ShareRoomUrlDto,
  CreateRoomResponseDto,
} from 'common/types/types';
import { room as roomRepository } from 'data/repositories/repositories';
import { HttpError } from 'exceptions/exceptions';
import {
  socket as socketService,
  user as userService,
  mailer as mailerService,
} from 'services/services';

type Constructor = {
  roomRepository: typeof roomRepository;
  socketService: typeof socketService;
  userService: typeof userService;
  mailerService: typeof mailerService;
};

class Room {
  private _roomRepository: typeof roomRepository;
  private _socketService: typeof socketService;
  private _userService: typeof userService;
  private _mailerService: typeof mailerService;

  public constructor(params: Constructor) {
    this._roomRepository = params.roomRepository;
    this._socketService = params.socketService;
    this._userService = params.userService;
    this._mailerService = params.mailerService;
  }

  public async getById(roomId: number): Promise<RoomDto> {
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

  public async getShareUrl(roomId: number): Promise<ShareRoomUrlDto> {
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
    userId: number,
    payload: SendRoomUrlToEmailsRequestDto,
  ): Promise<void> {
    const user = await this._userService.getById(userId);
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
    roomId: number,
    payload: ParticipantIdDto,
  ): Promise<void> {
    const { participantId } = payload;
    const { count } =
      (await this._roomRepository.getParticipantsCountById(roomId)) ?? {};

    if (!count && count !== 0) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
      });
    } else if (count >= MAX_USERS_IN_ROOM) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.MAX_COUNT_OF_USERS,
      });
    }

    const { userId: ownerId } =
      (await this._roomRepository.getOwnerIdByPersonalRoomId(roomId)) ?? {};

    if (participantId !== ownerId && ownerId) {
      throw new HttpError({
        status: HttpCode.FORBIDDEN,
        message: HttpErrorMessage.JOIN_PERSONAL_ROOM,
      });
    }

    await this._userService.updateCurrentRoomByUserId(participantId, roomId);

    const { email, ...participant } =
      (await this._userService.getById(participantId)) ?? {};

    if (!email) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
      });
    }

    this._socketService.io
      .to(String(roomId))
      .emit(SocketEvent.ADD_PARTICIPANT, participant);
  }

  public async removeParticipant(
    roomId: number,
    participantId: number,
  ): Promise<void> {
    const { count } =
      (await this._roomRepository.getParticipantsCountById(roomId)) ?? {};

    if (!count && count !== 0) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
      });
    }

    const { userId: ownerId } =
      (await this._roomRepository.getOwnerIdByPersonalRoomId(roomId)) ?? {};

    await this._userService.updateCurrentRoomByUserId(participantId, null);

    this._socketService.io
      .to(String(roomId))
      .emit(SocketEvent.REMOVE_PARTICIPANT, { participantId });

    if (count === 1 && !ownerId) {
      this._socketService.io.emit(SocketEvent.DELETE_ROOM, { roomId });
      await this._roomRepository.removeById(roomId);
    }
  }
}

export { Room };
