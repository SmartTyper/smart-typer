import { ReducerName } from 'common/enums/enums';
import { createSlice, isAnyOf } from 'store/external';
import { racing as racingActions } from './actions';
import { GameRoom, RoomDto } from 'common/types/types';

type State = {
  personalRoom: RoomDto | null;
  currentRoom: GameRoom | null;
  availableRooms: RoomDto[];
};

const initialState: State = {
  personalRoom: null,
  currentRoom: null,
  availableRooms: [],
};

const { reducer } = createSlice({
  name: ReducerName.PROFILE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const {
      setPersonalRoom,
      loadCurrentRoom,
      setPersonalRoomAsCurrent,
      loadAvailableRooms,
    } = racingActions;
    builder
      .addCase(setPersonalRoom, (state, action) => {
        state.personalRoom = action.payload;
      })
      .addCase(loadAvailableRooms.fulfilled, (state, action) => {
        state.availableRooms = action.payload;
      })
      .addMatcher(
        isAnyOf(setPersonalRoomAsCurrent, loadCurrentRoom.fulfilled),
        (state, action) => {
          state.currentRoom = action.payload;
        },
      );
  },
});

export { reducer };
