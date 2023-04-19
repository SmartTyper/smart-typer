// import { UserToRoomKey } from 'common/enums/enums';
import { IUserToRoomRecord } from 'common/interfaces/interfaces';
import { RecordWithoutCommonKeys } from 'common/types/types';
import { UserToRoom as UserToRoomModel } from 'data/models/models';

type Constructor = {
  UserToRoomModel: typeof UserToRoomModel;
};

class UserToRoom {
  private _UserToRoomModel: typeof UserToRoomModel;

  public constructor(params: Constructor) {
    this._UserToRoomModel = params.UserToRoomModel;
  }

  public async create(
    data: RecordWithoutCommonKeys<IUserToRoomRecord>,
  ): Promise<IUserToRoomRecord> {
    return this._UserToRoomModel.query().insert(data);
  }
}
export { UserToRoom };
