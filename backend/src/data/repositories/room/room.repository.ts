import { DEFAULT_PERSONAL_ROOM_NAME } from 'common/constants/constants';
import { CommonKey } from 'common/enums/enums';
import { IRoomRecord } from 'common/interfaces/interfaces';
import { RecordWithoutCommonKeys } from 'common/types/types';
import { Room as RoomModel } from 'data/models/models';

type Constructor = {
  RoomModel: typeof RoomModel;
};

class Room {
  private _RoomModel: typeof RoomModel;

  public constructor(params: Constructor) {
    this._RoomModel = params.RoomModel;
  }

  public async create(
    data: RecordWithoutCommonKeys<IRoomRecord>,
  ): Promise<IRoomRecord> {
    return this._RoomModel.query().insertAndFetch(data);
  }

  public async createPersonal(): Promise<Pick<IRoomRecord, CommonKey.ID>> {
    return this._RoomModel
      .query()
      .insertAndFetch({ name: DEFAULT_PERSONAL_ROOM_NAME, isPrivate: true })
      .returning('id');
  }
}
export { Room };
