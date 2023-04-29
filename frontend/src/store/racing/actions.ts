import { createAsyncThunk, createAction } from 'store/external';
import { RacingActionType } from './common';
import { RoomDto, RoomIdDto } from 'common/types/types';
import { GameRoom } from 'common/types/types';
import { mapRoomToGameRoom } from 'helpers/helpers';

const setPersonalRoom = createAction(
  RacingActionType.SET_PERSONAL_ROOM,
  (payload: RoomDto) => ({ payload }),
);

const loadCurrentRoom = createAsyncThunk(
  RacingActionType.LOAD_CURRENT_ROOM,
  async (payload: RoomIdDto, { extra: { service } }): Promise<GameRoom> => {
    const { racingApiService } = service;
    const room = await racingApiService.getRoom(payload);
    const currentRoom = mapRoomToGameRoom(room);
    return currentRoom;
  },
);

const loadAvailableRooms = createAsyncThunk(
  RacingActionType.LOAD_AVAILABLE_ROOMS,
  async (_: undefined, { extra: { service } }): Promise<RoomDto[]> => {
    const { racingApiService } = service;
    return racingApiService.getAvailableRooms();
  },
);

const setPersonalRoomAsCurrent = createAction(
  RacingActionType.SET_PERSONAL_ROOM_AS_CURRENT,
  (_: undefined, { state }) => {
    const currentRoom = mapRoomToGameRoom(state.personalRoom);
    return { payload: currentRoom };
  },
);

const racing = {
  setPersonalRoom,
  loadCurrentRoom,
  setPersonalRoomAsCurrent,
  loadAvailableRooms,
};

export { racing };
