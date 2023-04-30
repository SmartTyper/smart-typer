import { createAsyncThunk, createAction } from 'store/external/external';
import { RoomDto, RoomIdDto } from 'common/types/types';
import { GameRoom } from 'common/types/types';
import { mapRoomToGameRoom } from 'helpers/helpers';
import { ActionType } from './action-type';

const setPersonalRoom = createAction(
  ActionType.SET_PERSONAL_ROOM,
  (payload: RoomDto) => ({ payload }),
);

const loadCurrentRoom = createAsyncThunk(
  ActionType.LOAD_CURRENT_ROOM,
  async (payload: RoomIdDto, { extra: { services } }): Promise<GameRoom> => {
    const { racingApi: racingApiService } = services;
    const room = await racingApiService.getRoom(payload);
    const currentRoom = mapRoomToGameRoom(room);
    return currentRoom;
  },
);

const loadAvailableRooms = createAsyncThunk(
  ActionType.LOAD_AVAILABLE_ROOMS,
  async (_: undefined, { extra: { services } }): Promise<RoomDto[]> => {
    const { racingApi: racingApiService } = services;
    return racingApiService.getAvailableRooms();
  },
);

const setPersonalRoomAsCurrent = createAction(
  ActionType.SET_PERSONAL_ROOM_AS_CURRENT,
  (_: undefined, { state }) => {
    const currentRoom = mapRoomToGameRoom(state.personalRoom);
    return { payload: currentRoom };
  },
);

const addRoomToAvailableRooms = createAction(
  ActionType.ADD_ROOM_TO_AVAILABLE_ROOMS,
  (payload: RoomDto) => ({ payload }),
);

const removeRoomToAvailableRooms = createAction(
  ActionType.REMOVE_ROOM_TO_AVAILABLE_ROOMS,
  (payload: RoomIdDto) => ({ payload }),
);

const setShareRoomId = createAction(
  ActionType.SET_SHARE_ROOM_ID,
  (payload: RoomIdDto) => ({ payload }),
);

const resetShareRoomId = createAction(
  ActionType.RESET_SHARE_ROOM_ID,
  (payload: RoomIdDto) => ({ payload }),
);

const actions = {
  setPersonalRoom,
  loadCurrentRoom,
  setPersonalRoomAsCurrent,
  loadAvailableRooms,
  addRoomToAvailableRooms,
  removeRoomToAvailableRooms,
  setShareRoomId,
  resetShareRoomId,
};

export { actions };
