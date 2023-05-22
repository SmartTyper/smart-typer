import { ENV, MAX_USERS_IN_ROOM } from 'common/constants/constants';
import { HttpCode, HttpErrorMessage, SocketEvent } from 'common/enums/enums';
import {
  CreateRoomRequestDto,
  RoomDto,
  ParticipantIdDto,
  SendRoomUrlToEmailsRequestDto,
  ShareRoomUrlDto,
} from 'common/types/types';
import { room as roomRepository } from 'data/repositories/repositories';
import { HttpError } from 'exceptions/exceptions';
import {
  socket as socketService,
  user as userService,
  mailer as mailerService,
  userToRoom as userToRoomService,
} from 'services/services';

type Constructor = {
  roomRepository: typeof roomRepository;
  socketService: typeof socketService;
  userService: typeof userService;
  mailerService: typeof mailerService;
  userToRoomService: typeof userToRoomService;
};

class Room {
  private _roomRepository: typeof roomRepository;
  private _socketService: typeof socketService;
  private _userService: typeof userService;
  private _mailerService: typeof mailerService;
  private _userToRoomService: typeof userToRoomService;

  public constructor(params: Constructor) {
    this._roomRepository = params.roomRepository;
    this._socketService = params.socketService;
    this._userService = params.userService;
    this._mailerService = params.mailerService;
    this._userToRoomService = params.userToRoomService;
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
  ): Promise<Omit<RoomDto, 'participants'>> {
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
    const room = await this._roomRepository.getNotPrivateById(roomId);
    if (!room) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
      });
    } else if (room.participants.length >= MAX_USERS_IN_ROOM) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.MAX_COUNT_OF_USERS,
      });
    }

    const participant = room.participants.find(
      (participant) => participant.id === participantId,
    );
    if (!participant) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
      });
    }

    await this._userToRoomService.setCurrentRoomIdByUserId(participant.id, {
      currentRoomId: room.id,
    });

    this._socketService.io
      .to(String(roomId))
      .emit(SocketEvent.ADD_PARTICIPANT, participant);
  }

  public async removeParticipant(
    roomId: number,
    participantId: number,
  ): Promise<void> {
    const room = await this._roomRepository.getNotPrivateById(roomId);
    if (!room) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
      });
    } else if (room.participants.length >= MAX_USERS_IN_ROOM) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.MAX_COUNT_OF_USERS,
      });
    }

    const participant = room.participants.find(
      (participant) => participant.id === participantId,
    );
    if (!participant) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
      });
    }

    await this._userToRoomService.setCurrentRoomIdByUserId(participant.id, {
      currentRoomId: null,
    });

    this._socketService.io
      .to(String(roomId))
      .emit(SocketEvent.REMOVE_PARTICIPANT, { userId: participantId });

    if (!room.participants.length) {
      this._socketService.io.emit(SocketEvent.DELETE_ROOM, { roomId });
      await this._roomRepository.removeById(roomId);
    }
  }
}

export { Room };
