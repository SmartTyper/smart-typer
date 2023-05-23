type AhpPayload = {
  skillId: number;
  countInLessons: CountInLesson[];
  lastFinishedLessonIds: number[];
}[];

type CountInLesson = {
  lessonId: number;
  amount: number;
};

export type { AhpPayload };
