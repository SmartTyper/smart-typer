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
    const {
      create,
      loadMoreLessons,
      loadLessons,
      addLesson,
      loadCurrent,
      resetAll,
      resetStudyPlan,
      loadStudyPlan,
      resetCurrent,
      addMisclick,
      addTimestamp,
    } = actions;
    builder
      .addCase(addLesson, (state, action) => {
        state.lessons = [...state.lessons, action.payload];
      })
      .addCase(loadMoreLessons.fulfilled, (state, action) => {
        state.lessons = [...state.lessons, ...action.payload.data];
        state.allLessonsCount = action.payload.count;
      })
      .addCase(loadLessons.fulfilled, (state, action) => {
        state.lessons = action.payload.data;
        state.allLessonsCount = action.payload.count;
      })
      .addCase(resetAll, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(loadStudyPlan.fulfilled, (state, action) => {
        state.studyPlan = action.payload;
      })
      .addCase(resetCurrent, (state) => {
        state.currentLesson = null;
      })
      .addCase(resetStudyPlan, (state) => {
        state.studyPlan = [];
      })
      .addCase(addMisclick, (state, action) => {
        const index = action.payload;
        if (state.currentLesson) {
          state.currentLesson.misclicks.splice(index, 0, true);
        }
      })
      .addCase(addTimestamp, (state, action) => {
        if (state.currentLesson) {
          state.currentLesson.timestamps.push(action.payload);
        }
      })
      .addMatcher(
        isAnyOf(create.fulfilled, loadCurrent.fulfilled),
        (state, action) => {
          state.currentLesson = action.payload;
          const misclicksLength = action.payload.content.length;
          state.currentLesson.misclicks = new Array(misclicksLength).fill(
            false,
          );
        },
      );
  },
});

export { reducer };
