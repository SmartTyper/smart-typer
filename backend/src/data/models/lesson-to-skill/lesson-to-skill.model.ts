import { TableName, LessonToSkillKey } from 'common/enums/enums';
import { ILessonToSkillRecord } from 'common/interfaces/interfaces';

import { Base } from '../base/base.model';

class LessonToSkill extends Base implements ILessonToSkillRecord {
  public [LessonToSkillKey.SKILL_ID]!: ILessonToSkillRecord[LessonToSkillKey.SKILL_ID];

  public [LessonToSkillKey.LESSON_ID]!: ILessonToSkillRecord[LessonToSkillKey.LESSON_ID];

  public [LessonToSkillKey.COUNT]!: ILessonToSkillRecord[LessonToSkillKey.COUNT];

  public static override get tableName(): string {
    return TableName.LESSONS_TO_SKILLS;
  }
}

export { LessonToSkill };
