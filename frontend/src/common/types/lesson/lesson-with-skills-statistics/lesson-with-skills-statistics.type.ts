import {
  LessonResponseDto,
  SkillsStatisticsDto,
} from 'smart-typer-shared/common/types/types';

type LessonWithSkillsStatistics = LessonResponseDto & SkillsStatisticsDto;

export type { LessonWithSkillsStatistics };
