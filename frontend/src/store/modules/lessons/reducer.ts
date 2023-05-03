import { DEFAULT_SETTINGS } from 'common/constants/constants';
import { ReducerName } from 'common/enums/enums';
import { createSlice } from 'store/external/external';
import { actions } from './actions';
import { LessonDto } from 'smart-typer-shared/common/types/types';
import { LessonWithSkillsStatistics } from 'common/types/types';

type State = {
  currentLesson: LessonWithSkillsStatistics | null;
  lessons: LessonDto[];
};

const initialState: State = {
  currentLesson: null,
  lessons: [],
};

const { reducer } = createSlice({
  name: ReducerName.LESSONS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { create } = actions;
    builder.addCase(create.fulfilled, (state) => {
      // Object.assign(state, initialState);
    });
  },
});

export { reducer };
