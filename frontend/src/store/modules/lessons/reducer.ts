import { ReducerName } from 'common/enums/enums';
import { LessonDto, LessonWithSkillsStatistics } from 'common/types/types';
import { createSlice, isAnyOf } from 'store/external/external';
import { actions } from './actions';

type State = {
  currentLesson: LessonWithSkillsStatistics | null;
  lessons: LessonDto[];
  allLessonsCount: number;
  studyPlan: LessonDto[];
};

const initialState: State = {
  currentLesson: null,
  lessons: [],
  allLessonsCount: 0,
  studyPlan: [],
};

const { reducer } = createSlice({
  name: ReducerName.LESSONS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { create, loadMoreLessons, addLesson, loadCurrent, resetAll } =
      actions;
    builder
      .addCase(addLesson, (state, action) => {
        state.lessons = [...state.lessons, action.payload];
      })
      .addCase(loadMoreLessons.fulfilled, (state, action) => {
        state.lessons = [...state.lessons, ...action.payload.data];
        state.allLessonsCount = action.payload.count;
      })
      .addCase(resetAll, (state) => {
        Object.assign(state, initialState);
      })
      .addMatcher(
        isAnyOf(create.fulfilled, loadCurrent.fulfilled),
        (state, action) => {
          state.currentLesson = action.payload;
        },
      );
  },
});

export { reducer };
