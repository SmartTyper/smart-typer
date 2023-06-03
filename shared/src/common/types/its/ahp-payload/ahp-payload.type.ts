type AhpPayload = {
  lessons: AhpLesson[];
  lastFinishedLessonIds: number[];
  skillLevels: AhpSkillLevels[];
};

type SkillCountInLesson = {
  skillId: number;
  count: number;
};

type AhpLesson = {
  lessonId: number;
  skillsCountInLesson: SkillCountInLesson[];
};

type AhpSkillLevels = {
  id: number;
  level: number;
};

export type { AhpPayload };
