import { createAction, createAsyncThunk } from 'store/external/external';
import { ActionType } from './action-type';
import {
  CreateLessonRequestDto,
  LessonDto,
  LessonFilters,
  LessonIdDto,
  LessonResult,
  LessonWithSkillsStatistics,
} from 'common/types/types';
import { LESSONS_AMOUNT_FOR_ONE_REQUEST } from 'common/constants/constants';
import {
  IPaginationRequest,
  IPaginationResponse,
} from 'common/interface/interface';
import { mapLessonToLessonWithSkillsStatistics } from 'helpers/helpers';

const create = createAsyncThunk(
  ActionType.CREATE,
  async (
    payload: CreateLessonRequestDto,
    { extra: { services }, dispatch },
  ): Promise<LessonWithSkillsStatistics> => {
    const { lessonApi: lessonApiService } = services;
    const lesson = await lessonApiService.create(payload);
    dispatch(addLesson({ ...payload, id: lesson.id, bestSkill: null }));
    return mapLessonToLessonWithSkillsStatistics(lesson);
  },
);

const addLesson = createAction(
  ActionType.ADD_LESSON,
  (payload: CreateLessonRequestDto & Pick<LessonDto, 'id' | 'bestSkill'>) => ({
    payload,
  }),
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
    return mapLessonToLessonWithSkillsStatistics(lesson);
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

const resetCurrent = createAction(ActionType.RESET_CURRENT_LESSON);

const addMisclick = createAction(
  ActionType.ADD_MISCLICK,
  (charIndex: number) => ({ payload: charIndex }),
);

const addTimestamp = createAction(
  ActionType.ADD_TIMESTAMP,
  (timestamp: number) => ({ payload: timestamp }),
);

const sendLessonResult = createAsyncThunk(
  ActionType.SEND_LESSON_RESULT,
  async (payload: LessonResult, { extra: { services } }): Promise<void> => {
    const { lessonApi: lessonApiService } = services;
    await lessonApiService.sendLessonResult(payload);
  },
);

const actions = {
  create,
  loadMoreLessons,
  loadCurrent,
  addLesson,
  resetAll,
  loadStudyPlan,
  resetCurrent,
  addMisclick,
  addTimestamp,

  sendLessonResult,
};

export { actions };
