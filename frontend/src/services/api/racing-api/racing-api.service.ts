import {
  CreateRoomRequestDto,
  RoomDto,
  RoomIdDto,
  RoomIdUserIdDto,
  SendRoomUrlToEmailsRequestDto,
  ShareRoomUrlResponseDto,
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

  public async getShareRoomUrl(
    payload: RoomIdDto,
  ): Promise<ShareRoomUrlResponseDto> {
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

  public async addParticipant(payload: RoomIdUserIdDto): Promise<void> {
    const { roomId } = payload;
    return this._httpService.load(
      `${this._baseUrl}/rooms/${roomId}/participants`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { RacingApi };
