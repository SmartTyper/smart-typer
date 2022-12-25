import { Model, RelationMappings } from 'objection';

import {
  CommonKey,
  DbTableName,
  LessonToSkillKey,
  SkillKey,
} from '~/common/enums/enums';
import { ISkillRecord } from '~/common/interfaces/interfaces';

import { Base } from '../base/base.model';
import { Lesson } from '../lesson/lesson.model';

class Skill extends Base implements ISkillRecord {
  public [SkillKey.NAME]!: ISkillRecord[SkillKey.NAME];

  public static override get relationMappings(): RelationMappings {
    return {
      lessons: {
        relation: Model.ManyToManyRelation,
        modelClass: Lesson,
        join: {
          from: `${DbTableName.SKILLS}.${CommonKey.ID}`,
          through: {
            from: `${DbTableName.LESSONS_TO_SKILLS}.${LessonToSkillKey.SKILL_ID}`,
            to: `${DbTableName.LESSONS_TO_SKILLS}.${LessonToSkillKey.LESSON_ID}`,
          },
          to: `${DbTableName.LESSONS}.${CommonKey.ID}`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.SKILLS;
  }
}

export { Skill };
