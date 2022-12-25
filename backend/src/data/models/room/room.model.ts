import { Model, RelationMappings } from 'objection';

import {
  CommonKey,
  DbTableName,
  RoomKey,
  UserToRoomKey,
} from '~/common/enums/enums';
import { IRoomRecord } from '~/common/interfaces/interfaces';

import { Base } from '../base/base.model';
import { Lesson } from '../lesson/lesson.model';
import { User } from '../user/user.model';

class Room extends Base implements IRoomRecord {
  public [RoomKey.NAME]!: IRoomRecord[RoomKey.NAME];

  public [RoomKey.LESSON_ID]!: IRoomRecord[RoomKey.LESSON_ID];

  public [RoomKey.IS_PRIVATE]!: IRoomRecord[RoomKey.IS_PRIVATE];

  public static override get relationMappings(): RelationMappings {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.ROOMS}.${CommonKey.ID}`,
          through: {
            from: `${DbTableName.USERS_TO_ROOMS}.${UserToRoomKey.ROOM_ID}`,
            to: `${DbTableName.USERS_TO_ROOMS}.${UserToRoomKey.USER_ID}`,
          },
          to: `${DbTableName.USERS}.${CommonKey.ID}`,
        },
      },
      lesson: {
        relation: Model.BelongsToOneRelation,
        modelClass: Lesson,
        join: {
          from: `${DbTableName.ROOMS}.${RoomKey.LESSON_ID}`,
          to: `${DbTableName.LESSONS}.${CommonKey.ID}`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.ROOMS;
  }
}

export { Room };
