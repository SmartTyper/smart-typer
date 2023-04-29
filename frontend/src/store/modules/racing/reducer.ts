import { ReducerName } from 'common/enums/enums';
import { GameRoom, RoomDto } from 'common/types/types';
import { createSlice, isAnyOf } from 'store/external/external';
import { actions } from './actions';

type State = {
  personalRoom: RoomDto | null;
  currentRoom: GameRoom | null;
  shareRoomId: RoomDto['id'] | null;
  availableRooms: RoomDto[];
};

const initialState: State = {
  personalRoom: null,
  currentRoom: null,
  shareRoomId: null,
  availableRooms: [],
};

// createRoom
// deleteRoom

// setCurrentRoom

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
    } = actions;
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
