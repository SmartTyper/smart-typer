import {
  CreateRoomRequestDto,
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

class RoomApi {
  private _httpService: HttpService;
  private _baseUrl = '/api/rooms';

  public constructor(params: Constructor) {
    this._httpService = params.httpService;
  }

  public async get(payload: RoomIdDto): Promise<RoomDto> {
    const { roomId } = payload;
    return this._httpService.load(`${this._baseUrl}/${roomId}`);
  }

  public async getAllAvailable(): Promise<RoomDto[]> {
    return this._httpService.load(this._baseUrl);
  }

  public async create(payload: CreateRoomRequestDto): Promise<RoomIdDto> {
    return this._httpService.load(this._baseUrl, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
    });
  }

  public async getShareUrl(payload: RoomIdDto): Promise<ShareRoomUrlDto> {
    const { roomId } = payload;
    return this._httpService.load(`${this._baseUrl}/${roomId}/share-url`);
  }

  public async sendShareUrlToEmails(
    payload: SendRoomUrlToEmailsRequestDto,
  ): Promise<void> {
    return this._httpService.load(`${this._baseUrl}/share-url`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
    });
  }

  public async addParticipant(payload: RoomIdParticipantIdDto): Promise<void> {
    const { roomId, participantId } = payload;
    return this._httpService.load(`${this._baseUrl}/${roomId}/participants`, {
      method: HttpMethod.POST,
      payload: JSON.stringify({ participantId }),
    });
  }

  public async removeParticipant(
    payload: RoomIdParticipantIdDto,
  ): Promise<void> {
    const { roomId, participantId } = payload;
    return this._httpService.load(
      `${this._baseUrl}/${roomId}/participants/${participantId}`,
      {
        method: HttpMethod.DELETE,
      },
    );
  }
}

export { RoomApi };
