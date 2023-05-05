import {
  GetLessonResponseDto,
  SkillsStatistics,
} from 'smart-typer-shared/common/types/types';

type LessonWithSkillsStatisticsDto = GetLessonResponseDto & SkillsStatistics;

export type { LessonWithSkillsStatisticsDto };
