import { AhpPayload, LessonDto, LessonWithSkills } from 'common/types/types';

type MapLessonsToNextStudyPlanLessonPayload = {
  lastFinishedLessons: Pick<LessonDto, 'id'>[];
  systemLessons: Omit<LessonWithSkills, 'content' | 'name'>[];
};

const mapLessonsToNextStudyPlanLessonPayload = ({
  lastFinishedLessons,
  systemLessons,
}: MapLessonsToNextStudyPlanLessonPayload): AhpPayload => {
  const lastFinishedLessonIds = lastFinishedLessons.map(({ id }) => id);
  const lessons = systemLessons.map((systemLesson) => ({
    lessonId: systemLesson.id,
    skillsCountInLesson: systemLesson.skills.map((skill) => ({
      skillId: skill.id,
      count: skill.count,
    })),
  }));

  return { lastFinishedLessonIds, lessons };
};

export { mapLessonsToNextStudyPlanLessonPayload };
