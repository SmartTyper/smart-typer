import {
  LessonResponseDto,
  LessonWithSkillsStatistics,
} from 'common/types/types';
import { DEFAULT_SKILLS_STATISTICS } from 'common/constants/constants';

const mapLessonToLessonWithSkillsStatistics = (
  lesson: LessonResponseDto,
): LessonWithSkillsStatistics => {
  const mappedLesson = {
    ...DEFAULT_SKILLS_STATISTICS,
    ...lesson,
  };

  return mappedLesson;
};

export { mapLessonToLessonWithSkillsStatistics };
