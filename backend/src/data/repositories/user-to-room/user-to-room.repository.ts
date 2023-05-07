import { TableName, UserToRoomKey } from 'common/enums/enums';
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

  private static DEFAULT_USER_TO_ROOM_COLUMNS_TO_RETURN: string[] = [
    `${TableName.USERS_TO_ROOMS}.${UserToRoomKey.USER_ID}`,
    `${TableName.USERS_TO_ROOMS}.${UserToRoomKey.CURRENT_ROOM_ID}`,
    `${TableName.USERS_TO_ROOMS}.${UserToRoomKey.PERSONAL_ROOM_ID}`,
  ];

  public async create(
    data: RecordWithoutCommonKeys<IUserToRoomRecord>,
  ): Promise<RecordWithoutCommonKeys<IUserToRoomRecord>> {
    return this._UserToRoomModel
      .query()
      .insert(data)
      .returning(UserToRoom.DEFAULT_USER_TO_ROOM_COLUMNS_TO_RETURN);
  }

  public async patchCurrentRoomIdByUserId(
    userId: number,
    currentRoomId: Pick<IUserToRoomRecord, UserToRoomKey.CURRENT_ROOM_ID>,
  ): Promise<RecordWithoutCommonKeys<IUserToRoomRecord>> {
    return this._UserToRoomModel
      .query()
      .patch(currentRoomId)
      .findOne({ userId })
      .returning(UserToRoom.DEFAULT_USER_TO_ROOM_COLUMNS_TO_RETURN);
  }
}
export { UserToRoom };
