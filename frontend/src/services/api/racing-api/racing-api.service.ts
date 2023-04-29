import { RoomDto, RoomIdDto } from 'smart-typer-shared/common/types/types';
import { Http as HttpService } from '../../http/http.service';

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
}

export { RacingApi };
