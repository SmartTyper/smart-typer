import { LessonToSkillKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/record/common-record/common-record.interface';

interface ILessonToSkillRecord extends ICommonRecord {
  [LessonToSkillKey.SKILL_ID]: number;
  [LessonToSkillKey.LESSON_ID]: number;
  [LessonToSkillKey.COUNT]: number;
}

export type { ILessonToSkillRecord };
