import { ReducerName } from 'common/enums/enums';
import { ActionType } from 'store/common';
import { createSlice, isAnyOf } from 'store/external';
import {
  STARTED_ACTIONS,
  FINISHED_ACTIONS,
  REQUEST_ACTIONS_TYPES,
} from './common';

const initialState: Partial<Record<ActionType, boolean>> = {};
for (const requestActionType of REQUEST_ACTIONS_TYPES) {
  initialState[requestActionType] = false;
}

const { reducer } = createSlice({
  name: ReducerName.REQUEST,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf.apply(STARTED_ACTIONS), (state, action) => {
        state[action.type as ActionType] = true;
      })
      .addMatcher(isAnyOf.apply(FINISHED_ACTIONS), (state, action) => {
        state[action.type as ActionType] = false;
      });
  },
});

export { reducer };
