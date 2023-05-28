/* eslint-disable prefer-spread */
import { ReducerName } from 'common/enums/enums';
import { createSlice, isAnyOf } from 'store/external/external';
import {
  STARTED_ACTIONS,
  FINISHED_ACTIONS,
  REQUEST_ACTIONS_TYPES,
} from './constants';

type RequestActionType = (typeof REQUEST_ACTIONS_TYPES)[number];

const initialState = {} as Record<RequestActionType, boolean>;
for (const requestActionType of REQUEST_ACTIONS_TYPES) {
  initialState[requestActionType] = false;
}

const { reducer } = createSlice({
  name: ReducerName.REQUESTS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .addMatcher(isAnyOf.apply(null, STARTED_ACTIONS), (state, action) => {
        state[action.type.split('/').shift() as RequestActionType] = true;
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .addMatcher(isAnyOf.apply(null, FINISHED_ACTIONS), (state, action) => {
        console.log(action.type.split('/'));
        state[action.type.split('/').shift() as RequestActionType] = false;
      });
  },
});

export { reducer };
