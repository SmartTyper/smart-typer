import { CommonKey, LessonKey } from 'common/enums/enums';
import { AhpPayload, LessonDto, LessonWithSkills } from 'common/types/types';

type MapLessonsToNextStudyPlanLessonPayload = {
  lastFinishedLessons: Pick<LessonDto, CommonKey.ID>[];
  systemLessons: Omit<LessonWithSkills, LessonKey.CONTENT | LessonKey.NAME>[];
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
