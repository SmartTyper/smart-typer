import { Model, RelationMappings } from 'objection';

import {
  CommonKey,
  TableName,
  RoomKey,
  UserToRoomKey,
  RoomRelationMappings,
} from 'common/enums/enums';
import { IRoomRecord } from 'common/interfaces/interfaces';
import { Lesson, User } from 'data/models/models';

import { Base } from '../base/base.model';

class Room extends Base implements IRoomRecord {
  public [RoomKey.NAME]!: IRoomRecord[RoomKey.NAME];

  public [RoomKey.LESSON_ID]!: IRoomRecord[RoomKey.LESSON_ID];

  public [RoomKey.IS_PRIVATE]!: IRoomRecord[RoomKey.IS_PRIVATE];

  public static override get relationMappings(): RelationMappings {
    return {
      [RoomRelationMappings.PARTICIPANTS]: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: `${TableName.ROOMS}.${CommonKey.ID}`,
          through: {
            from: `${TableName.USERS_TO_ROOMS}.${UserToRoomKey.CURRENT_ROOM_ID}`,
            to: `${TableName.USERS_TO_ROOMS}.${UserToRoomKey.USER_ID}`,
          },
          to: `${TableName.USERS}.${CommonKey.ID}`,
        },
      },
      [RoomRelationMappings.LESSON]: {
        relation: Model.BelongsToOneRelation,
        modelClass: Lesson,
        join: {
          from: `${TableName.ROOMS}.${RoomKey.LESSON_ID}`,
          to: `${TableName.LESSONS}.${CommonKey.ID}`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return TableName.ROOMS;
  }
}

export { Room };
