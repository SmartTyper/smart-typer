import { TableName, UserToRoomKey } from 'common/enums/enums';
import { IUserToRoomRecord } from 'common/interfaces/interfaces';

import { Base } from '../base/base.model';

class RoomToUser extends Base implements IUserToRoomRecord {
  public [UserToRoomKey.PERSONAL_ROOM_ID]!: IUserToRoomRecord[UserToRoomKey.PERSONAL_ROOM_ID];

  public [UserToRoomKey.CURRENT_ROOM_ID]!: IUserToRoomRecord[UserToRoomKey.CURRENT_ROOM_ID];

  public [UserToRoomKey.USER_ID]!: IUserToRoomRecord[UserToRoomKey.USER_ID];

  public static override get tableName(): string {
    return TableName.USERS_TO_ROOMS;
  }
}

export { RoomToUser };
