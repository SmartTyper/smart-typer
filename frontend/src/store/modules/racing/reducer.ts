import { ReducerName } from 'common/enums/enums';
import { GameRoom, RoomDto, ShareRoomUrlDto } from 'common/types/types';
import { createSlice } from 'store/external/external';
import { actions } from './actions';

type State = {
  personalRoom: RoomDto | null;
  currentRoom: GameRoom | null;
  shareRoomUrl: ShareRoomUrlDto['url'] | null;
  availableRooms: RoomDto[];
  isLoadCurrentRoomFailed: boolean;
};

const initialState: State = {
  personalRoom: null,
  currentRoom: null,
  shareRoomUrl: null,
  availableRooms: [],
  isLoadCurrentRoomFailed: false,
};

const { reducer } = createSlice({
  name: ReducerName.RACING,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const {
      setPersonalRoom,
      loadCurrentRoom,
      loadAvailableRooms,
      addRoomToAvailableRooms,
      removeRoomToAvailableRooms,
      resetShareRoomUrl,
      loadCommentatorText,
      setCurrentRoom,
      resetIsLoadCurrentRoomFailed,
      loadShareRoomUrl,
      addParticipant,
      removeParticipant,
      toggleParticipantIsReady,
      setSpentSeconds,
      increaseParticipantPosition,
      resetAll,
      resetToDefault,
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
      .addCase(setCurrentRoom.fulfilled, (state, action) => {
        state.currentRoom = action.payload;
      })
      .addCase(loadCurrentRoom.rejected, (state) => {
        state.isLoadCurrentRoomFailed = true;
      })
      .addCase(resetIsLoadCurrentRoomFailed, (state) => {
        state.isLoadCurrentRoomFailed = false;
      })
      .addCase(addParticipant, (state, action) => {
        if (state.currentRoom) {
          const { participants } = state.currentRoom;
          state.currentRoom = {
            ...state.currentRoom,
            participants: [...participants, action.payload],
          };
        }
      })
      .addCase(removeParticipant, (state, action) => {
        if (state.currentRoom) {
          const participantId = action.payload;
          const { participants } = state.currentRoom;
          const updatedParticipants = participants.filter(
            (participant) => participant.id === participantId,
          );
          state.currentRoom = {
            ...state.currentRoom,
            participants: updatedParticipants,
          };
        }
      })
      .addCase(loadCommentatorText.fulfilled, (state, action) => {
        const { commentatorText } = action.payload;
        if (state.currentRoom) {
          state.currentRoom = {
            ...state.currentRoom,
            commentatorText,
          };
        }
      })
      .addCase(toggleParticipantIsReady, (state, action) => {
        if (state.currentRoom) {
          const participantId = action.payload;
          const { participants } = state.currentRoom;
          const updatedParticipants = participants.map((participant) => {
            if (participant.id === participantId) {
              return { ...participant, isReady: !participant.isReady };
            }
            return participant;
          });
          state.currentRoom = {
            ...state.currentRoom,
            participants: updatedParticipants,
          };
        }
      })
      .addCase(increaseParticipantPosition, (state, action) => {
        if (state.currentRoom) {
          const participantId = action.payload;
          const { participants } = state.currentRoom;
          const updatedParticipants = participants.map((participant) => {
            if (participant.id === participantId) {
              return { ...participant, position: participant.position + 1 };
            }
            return participant;
          });
          state.currentRoom = {
            ...state.currentRoom,
            participants: updatedParticipants,
          };
        }
      })
      .addCase(setSpentSeconds, (state, action) => {
        if (state.currentRoom) {
          const { id: participantId, spentSeconds } = action.payload;
          const { participants } = state.currentRoom;
          const updatedParticipants = participants.map((participant) => {
            if (participant.id === participantId) {
              return { ...participant, spentSeconds };
            }
            return participant;
          });
          state.currentRoom = {
            ...state.currentRoom,
            participants: updatedParticipants,
          };
        }
      })
      .addCase(resetAll, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(resetToDefault.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentRoom = action.payload;
        }
      });
  },
});

export { reducer };
