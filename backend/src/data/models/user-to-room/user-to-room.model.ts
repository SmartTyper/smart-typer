import { Model, RelationMappings } from 'objection';
import {
  CommonKey,
  TableName,
  UserToRoomKey,
  UserToRoomRelationMappings,
} from 'common/enums/enums';
import { IUserToRoomRecord } from 'common/interfaces/interfaces';
import { Room } from 'data/models/models';

import { Base } from '../base/base.model';

class UserToRoom extends Base implements IUserToRoomRecord {
  public [UserToRoomKey.PERSONAL_ROOM_ID]!: IUserToRoomRecord[UserToRoomKey.PERSONAL_ROOM_ID];

  public [UserToRoomKey.CURRENT_ROOM_ID]!: IUserToRoomRecord[UserToRoomKey.CURRENT_ROOM_ID];

  public [UserToRoomKey.USER_ID]!: IUserToRoomRecord[UserToRoomKey.USER_ID];

  public static override get tableName(): string {
    return TableName.USERS_TO_ROOMS;
  }

  public static override get relationMappings(): RelationMappings {
    return {
      [UserToRoomRelationMappings.PERSONAL_ROOM]: {
        relation: Model.HasOneRelation,
        modelClass: Room,
        join: {
          from: `${TableName.USERS_TO_ROOMS}.${UserToRoomKey.PERSONAL_ROOM_ID}`,
          to: `${TableName.ROOMS}.${CommonKey.ID}`,
        },
      },
    };
  }
}

export { UserToRoom };
