import { ReducerName } from 'common/enums/enums';
import { GameRoom, RoomDto, ShareRoomUrlResponseDto } from 'common/types/types';
import { createSlice } from 'store/external/external';
import { actions } from './actions';

type State = {
  personalRoom: RoomDto | null;
  currentRoom: GameRoom | null;
  shareRoomUrl: ShareRoomUrlResponseDto['url'] | null;
  availableRooms: RoomDto[];
};

const initialState: State = {
  personalRoom: null,
  currentRoom: null,
  shareRoomUrl: null,
  availableRooms: [],
};

const { reducer } = createSlice({
  name: ReducerName.PROFILE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const {
      setPersonalRoom,
      setCurrentRoom,
      loadAvailableRooms,
      addRoomToAvailableRooms,
      removeRoomToAvailableRooms,
      resetShareRoomUrl,
      // setCommentatorText,
      loadShareRoomUrl,
    } = actions;
    builder
      .addCase(setPersonalRoom, (state, action) => {
        state.personalRoom = action.payload;
      })
      .addCase(loadAvailableRooms.fulfilled, (state, action) => {
        state.availableRooms = action.payload;
      })
      .addCase(addRoomToAvailableRooms, (state, action) => {
        state.availableRooms = [...state.availableRooms, action.payload];
      })
      .addCase(removeRoomToAvailableRooms, (state, action) => {
        state.availableRooms = state.availableRooms.filter(
          (room) => room.id !== action.payload,
        );
      })
      .addCase(loadShareRoomUrl.fulfilled, (state, action) => {
        state.shareRoomUrl = action.payload;
      })
      .addCase(resetShareRoomUrl, (state) => {
        state.shareRoomUrl = null;
      })
      // .addCase(setCommentatorText, (state, action) => {
      //   if (state.currentRoom) {
      //     state.currentRoom = {
      //       ...state.currentRoom,
      //       commentatorText: action.payload,
      //     };
      //   }
      // })
      .addCase(setCurrentRoom, (state, action) => {
        state.currentRoom = action.payload;
      });
  },
});

export { reducer };
