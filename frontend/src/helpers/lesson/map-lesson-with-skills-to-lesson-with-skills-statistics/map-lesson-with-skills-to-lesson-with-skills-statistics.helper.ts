import {
  LessonWithSkillsDto,
  LessonWithSkillsStatistics,
} from 'common/types/types';
import { DEFAULT_SKILL_STATISTICS } from 'common/constants/constants';

const mapLessonWithSkillsToLessonWithSkillsStatistics = (
  lesson: LessonWithSkillsDto,
): LessonWithSkillsStatistics => {
  const skills = lesson.skills.map((skill) => ({
    ...DEFAULT_SKILL_STATISTICS,
    ...skill,
  }));

  const mappedLesson = {
    ...lesson,
    skills,
  };

  return mappedLesson;
};

export { mapLessonWithSkillsToLessonWithSkillsStatistics };
