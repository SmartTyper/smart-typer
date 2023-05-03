import { createAsyncThunk } from 'store/external/external';
import { ActionType } from './action-type';
import {
  CreateLessonRequestDto,
  LessonWithSkillsDto,
} from 'common/types/types';

const create = createAsyncThunk(
  ActionType.CREATE,
  async (
    payload: CreateLessonRequestDto,
    { extra: { services } },
  ): Promise<LessonWithSkillsDto> => {
    const { lessonApi: lessonApiService } = services;
    const lesson = await lessonApiService.create(payload);
    return lesson;
  },
);

const loadMoreLessons = createAsyncThunk(
  ActionType.LOAD_MORE_LESSONS,
  // async (
  //   payload: CreateLessonRequestDto,
  //   { extra: { services } },
  // ): Promise<LessonWithSkillsDto> => {},
);

const loadCurrent = createAsyncThunk(
  ActionType.LOAD_CURRENT,
  // async (
  //   payload: CreateLessonRequestDto,
  //   { extra: { services } },
  // ): Promise<LessonWithSkillsDto> => {},
);

const actions = { create, loadMoreLessons, loadCurrent };

export { actions };
