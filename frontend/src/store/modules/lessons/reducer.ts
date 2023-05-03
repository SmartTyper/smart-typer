import { ReducerName } from 'common/enums/enums';
import { createSlice, isAnyOf } from 'store/external/external';
import { actions } from './actions';
import { LessonDto } from 'smart-typer-shared/common/types/types';
import { LessonWithSkillsStatistics } from 'common/types/types';

type State = {
  currentLesson: LessonWithSkillsStatistics | null;
  lessons: LessonDto[];
  allLessonsCount: number;
};

const initialState: State = {
  currentLesson: null,
  lessons: [],
  allLessonsCount: 0,
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
