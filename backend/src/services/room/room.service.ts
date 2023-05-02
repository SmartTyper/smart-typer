import { HttpCode, HttpErrorMessage, SocketEvent } from 'common/enums/enums';
import {
  CreateRoomRequestDto,
  LessonDto,
  RoomDto,
  RoomIdDto,
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
} from 'services/services';
// import

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
    return {} as RoomDto;
  }

  public async getAllAvailable(): Promise<RoomDto[]> {
    return [{}] as RoomDto[];
  }

  public async create(payload: CreateRoomRequestDto): Promise<RoomIdDto> {
    if (!payload.isPrivate) {
      this._socketService.io.emit(SocketEvent.CREATE_ROOM, createdRoom);
    }
    return {} as RoomIdDto;
  }

  public async getShareUrl(roomId: number): Promise<ShareRoomUrlDto> {
    return {} as ShareRoomUrlDto;
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
      subject: `${user.fullName} shared an Key Racing room with you`,
      text: shareRoomUrl,
    });
  }

  public async addParticipant(
    roomId: number,
    payload: ParticipantIdDto,
  ): Promise<void> {
    this._socketService.io
      .to(String(roomId))
      .emit(SocketEvent.ADD_PARTICIPANT, user);

    return;
  }

  public async removeParticipant(
    roomId: number,
    participantId: number,
  ): Promise<void> {
    this._socketService.io
      .to(String(roomId))
      .emit(SocketEvent.REMOVE_PARTICIPANT, { userId: participantId });
    // if (!room.users.length && room.type !== RoomType.PERSONAL) {
    this._socketService.io.emit(SocketEvent.DELETE_ROOM, { roomId });
    // }
    return;
  }

  public async getLessonContent(
    roomId: number,
  ): Promise<Pick<LessonDto, 'content'>> {
    return {} as Promise<Pick<LessonDto, 'content'>>;
  }

  public async deleteLessonContent(roomId: number): Promise<void> {
    return;
  }
}

export { Room };
