import { CommonKey, SkillKey } from 'common/enums/enums';
import {
  AhpPayload,
  LessonDto,
  LessonWithSkillsAndContentType,
  Skill,
} from 'common/types/types';

type MapLessonsToNextStudyPlanLessonPayload = {
  lastFinishedLessons: Pick<LessonDto, CommonKey.ID>[];
  systemLessons: LessonWithSkillsAndContentType[];
  skillLevels: Omit<Skill, SkillKey.NAME>[];
};

const mapLessonsToNextStudyPlanLessonPayload = ({
  lastFinishedLessons,
  systemLessons,
  skillLevels,
}: MapLessonsToNextStudyPlanLessonPayload): AhpPayload => {
  const lastFinishedLessonIds = lastFinishedLessons.map(({ id }) => id);
  const lessons = systemLessons.map((systemLesson) => ({
    lessonId: systemLesson.id,
    skillsCountInLesson: systemLesson.skills.map((skill) => ({
      skillId: skill.id,
      count: skill.count,
    })),
    contentType: systemLesson.contentType,
  }));
  const mappedSkillLevels = skillLevels.map(({ id, level }) => ({
    skillId: id,
    level,
  }));

  return { lastFinishedLessonIds, lessons, skillLevels: mappedSkillLevels };
};

export { mapLessonsToNextStudyPlanLessonPayload };
