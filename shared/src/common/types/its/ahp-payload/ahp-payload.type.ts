type AhpPayload = {
  lessons: Lesson[];
  lastFinishedLessonIds: number[];
};

type CountInLesson = {
  skillId: number;
  count: number;
};

type Lesson = {
  lessonId: number;
  skillsCountInLesson: CountInLesson[];
};

export type { AhpPayload };
