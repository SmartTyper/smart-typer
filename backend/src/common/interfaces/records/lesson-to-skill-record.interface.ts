import { LessonToSkillKey } from '~/common/enums/enums';

interface ILessonToSkillRecord {
  [LessonToSkillKey.ID]: number;
  [LessonToSkillKey.SKILL_ID]: number;
  [LessonToSkillKey.LESSON_ID]: number;
  [LessonToSkillKey.CREATED_AT]: string;
  [LessonToSkillKey.UPDATED_AT]: string;
}

export type { ILessonToSkillRecord };
