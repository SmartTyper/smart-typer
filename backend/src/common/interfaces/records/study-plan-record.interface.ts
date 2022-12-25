import { StudyPlanKey } from '~/common/enums/enums';

interface IStudyPlanRecord {
  [StudyPlanKey.ID]: number;
  [StudyPlanKey.USER_ID]: number;
  [StudyPlanKey.LESSON_ID]: number;
  [StudyPlanKey.PRIORITY]: number;
  [StudyPlanKey.CREATED_AT]: string;
  [StudyPlanKey.UPDATED_AT]: string;
}

export type { IStudyPlanRecord };
