import { createAction, createAsyncThunk } from 'store/external/external';
import { ActionType } from './action-type';
import {
  CreateLessonRequestDto,
  LessonDto,
  LessonFilters,
  LessonIdDto,
  LessonWithSkillsStatistics,
} from 'common/types/types';
import { LESSONS_AMOUNT_FOR_ONE_REQUEST } from 'common/constants/constants';
import {
  IPaginationRequest,
  IPaginationResponse,
} from 'common/interface/interface';
import { mapLessonWithSkillsToLessonWithSkillsStatistics } from 'helpers/helpers';

const create = createAsyncThunk(
  ActionType.CREATE,
  async (
    payload: CreateLessonRequestDto,
    { extra: { services }, dispatch },
  ): Promise<LessonWithSkillsStatistics> => {
    const { lessonApi: lessonApiService } = services;
    const lesson = await lessonApiService.create(payload);
    dispatch(addLesson({ ...payload, id: lesson.id }));
    return mapLessonWithSkillsToLessonWithSkillsStatistics(lesson);
  },
);

const addLesson = createAction(
  ActionType.ADD_LESSON,
  (payload: CreateLessonRequestDto & Pick<LessonDto, 'id'>) => ({ payload }),
);

const loadMoreLessons = createAsyncThunk(
  ActionType.LOAD_MORE_LESSONS,
  async (
    payload: Pick<IPaginationRequest, 'offset'> & LessonFilters,
    { extra: { services } },
  ): Promise<IPaginationResponse<LessonDto>> => {
    const { lessonApi: lessonApiService } = services;

    const result = await lessonApiService.getMore({
      limit: LESSONS_AMOUNT_FOR_ONE_REQUEST,
      ...payload,
    });
    return result;
  },
);

const loadCurrent = createAsyncThunk(
  ActionType.LOAD_CURRENT,
  async (
    payload: LessonIdDto,
    { extra: { services } },
  ): Promise<LessonWithSkillsStatistics> => {
    const { lessonApi: lessonApiService } = services;
    const lesson = await lessonApiService.get(payload);
    return mapLessonWithSkillsToLessonWithSkillsStatistics(lesson);
  },
);

const loadStudyPlan = createAsyncThunk(
  ActionType.LOAD_STUDY_PLAN,
  async (_: undefined, { extra: { services } }): Promise<LessonDto[]> => {
    const { lessonApi: lessonApiService } = services;
    const studyPlan = await lessonApiService.getStudyPlan();
    return studyPlan;
  },
);

const resetAll = createAction(ActionType.RESET_ALL);

const actions = {
  create,
  loadMoreLessons,
  loadCurrent,
  addLesson,
  resetAll,
  loadStudyPlan,
};

export { actions };
