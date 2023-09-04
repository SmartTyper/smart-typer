import { LessonDto } from 'common/types/types';

type StudyPlanLesson = LessonDto & {
  averageSpeed: number;
  isFinished: boolean;
};

export type { StudyPlanLesson };
