import { DbTableName, UserToRoomKey } from '~/common/enums/enums';
import { IUserToRoomRecord } from '~/common/interfaces/interfaces';

import { Base } from '../base/base.model';

class RoomToUser extends Base implements IUserToRoomRecord {
  public [UserToRoomKey.ROOM_ID]!: IUserToRoomRecord[UserToRoomKey.ROOM_ID];

  public [UserToRoomKey.USER_ID]!: IUserToRoomRecord[UserToRoomKey.USER_ID];

  public static override get tableName(): string {
    return DbTableName.USERS_TO_ROOMS;
  }
}

export { RoomToUser };
