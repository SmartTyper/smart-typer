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

type Constructor = {
  roomRepository: typeof roomRepository;
};

class Room {
  private _roomRepository: typeof roomRepository;

  public constructor(params: Constructor) {
    this._roomRepository = params.roomRepository;
  }

  public async getById(roomId: number): Promise<RoomDto> {
    return {} as RoomDto;
  }

  public async getAllAvailable(): Promise<RoomDto[]> {
    return [{}] as RoomDto[];
  }

  public async create(payload: CreateRoomRequestDto): Promise<RoomIdDto> {
    return {} as RoomIdDto;
  }

  public async getShareUrl(roomId: number): Promise<ShareRoomUrlDto> {
    return {} as ShareRoomUrlDto;
  }

  public async sendShareUrlToEmails(
    payload: SendRoomUrlToEmailsRequestDto,
  ): Promise<void> {
    return;
  }

  public async addParticipant(
    roomId: number,
    payload: ParticipantIdDto,
  ): Promise<void> {
    return;
  }

  public async removeParticipant(
    roomId: number,
    participantId: number,
  ): Promise<void> {
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
