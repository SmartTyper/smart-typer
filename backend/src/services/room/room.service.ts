import {
  CreateRoomRequestDto,
  LessonDto,
  RoomDto,
  RoomIdDto,
  RoomIdParticipantIdDto,
  SendRoomUrlToEmailsRequestDto,
  ShareRoomUrlDto,
} from 'common/types/types';
import { room as roomRepository } from 'data/repositories/repositories';

type Constructor = {
  roomRepository: typeof roomRepository;
};

class Room {
  private _roomRepository: typeof roomRepository;

  public constructor(params: Constructor) {
    this._roomRepository = params.roomRepository;
  }

  public async getById(payload: RoomIdDto): Promise<RoomDto> {
    return {} as RoomDto;
  }

  public async getAllAvailable(): Promise<RoomDto[]> {
    return [{}] as RoomDto[];
  }

  public async create(payload: CreateRoomRequestDto): Promise<RoomIdDto> {
    return {} as RoomIdDto;
  }

  public async getShareUrl(payload: RoomIdDto): Promise<ShareRoomUrlDto> {
    return {} as ShareRoomUrlDto;
  }

  public async sendShareUrlToEmails(
    payload: SendRoomUrlToEmailsRequestDto,
  ): Promise<void> {
    return;
  }

  public async addParticipant(payload: RoomIdParticipantIdDto): Promise<void> {
    return;
  }

  public async removeParticipant(
    payload: RoomIdParticipantIdDto,
  ): Promise<void> {
    return;
  }

  public async getLessonContent(
    payload: RoomIdDto,
  ): Promise<Pick<LessonDto, 'content'>> {
    return {} as Promise<Pick<LessonDto, 'content'>>;
  }

  public async deleteLessonContent(payload: RoomIdDto): Promise<void> {
    return;
  }
}

export { Room };
