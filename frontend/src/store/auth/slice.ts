import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name/reducer-name.enum';
import { ActionType } from './common';

type State = {
  user: null;
};

const initialState: State = {
  user: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.AUTH,
  initialState,
  reducers: {
    [ActionType.SetUser]: (state, action: PayloadAction<null>) => {
      state.user = action.payload;
    },
  },
});

export { reducer, actions };
