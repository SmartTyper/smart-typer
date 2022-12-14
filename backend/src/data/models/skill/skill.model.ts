import { Model, RelationMappings } from 'objection';

import {
  CommonKey,
  TableName,
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
          from: `${TableName.SKILLS}.${CommonKey.ID}`,
          through: {
            from: `${TableName.LESSONS_TO_SKILLS}.${LessonToSkillKey.SKILL_ID}`,
            to: `${TableName.LESSONS_TO_SKILLS}.${LessonToSkillKey.LESSON_ID}`,
          },
          to: `${TableName.LESSONS}.${CommonKey.ID}`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return TableName.SKILLS;
  }
}

export { Skill };
