import {
  CreateRoomRequestDto,
  JokeDto,
  LessonDto,
  RoomDto,
  RoomIdDto,
  RoomIdParticipantIdDto,
  SendRoomUrlToEmailsRequestDto,
  ShareRoomUrlDto,
} from 'common/types/types';
import { Http as HttpService } from '../../http/http.service';
import { HttpMethod } from 'common/enums/enums';

type Constructor = {
  httpService: HttpService;
};

class RacingApi {
  private _httpService: HttpService;
  private _baseUrl = '/api/racing';

  public constructor(params: Constructor) {
    this._httpService = params.httpService;
  }

  public async getRoom(payload: RoomIdDto): Promise<RoomDto> {
    const { roomId } = payload;
    return this._httpService.load(`${this._baseUrl}/rooms/${roomId}`);
  }

  public async getAvailableRooms(): Promise<RoomDto[]> {
    return this._httpService.load(`${this._baseUrl}/rooms`);
  }

  public async createRoom(payload: CreateRoomRequestDto): Promise<RoomIdDto> {
    return this._httpService.load(`${this._baseUrl}/rooms`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
    });
  }

  public async getShareRoomUrl(payload: RoomIdDto): Promise<ShareRoomUrlDto> {
    const { roomId } = payload;
    return this._httpService.load(`${this._baseUrl}/rooms/${roomId}/share-url`);
  }

  public async sendRoomUrlToEmails(
    payload: SendRoomUrlToEmailsRequestDto,
  ): Promise<void> {
    return this._httpService.load(`${this._baseUrl}/rooms/share-url`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
    });
  }

  public async addParticipant(payload: RoomIdParticipantIdDto): Promise<void> {
    const { roomId } = payload;
    return this._httpService.load(
      `${this._baseUrl}/rooms/${roomId}/participants`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(payload),
      },
    );
  }

  public async removeParticipant(
    payload: RoomIdParticipantIdDto,
  ): Promise<void> {
    const { roomId } = payload;
    return this._httpService.load(
      `${this._baseUrl}/rooms/${roomId}/participants`,
      { method: HttpMethod.DELETE },
    );
  }

  public async getLessonContent(
    payload: RoomIdDto,
  ): Promise<Pick<LessonDto, 'content'>> {
    const { roomId } = payload;
    return this._httpService.load(
      `${this._baseUrl}/rooms/${roomId}/lesson-content`,
    );
  }

  public async deleteLessonContent(payload: RoomIdDto): Promise<void> {
    const { roomId } = payload;
    return this._httpService.load(
      `${this._baseUrl}/rooms/${roomId}/lesson-content`,
      { method: HttpMethod.DELETE },
    );
  }

  public async getRandomJoke(): Promise<JokeDto> {
    return this._httpService.load(`${this._baseUrl}/jokes/random`);
  }
}

export { RacingApi };
