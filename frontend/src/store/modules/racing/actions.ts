import { createAsyncThunk, createAction } from 'store/external/external';
import {
  CreateRoomRequestDto,
  RoomDto,
  RoomIdDto,
  ShareRoomUrlResponseDto,
  SendRoomUrlToEmailsRequestDto,
} from 'common/types/types';
import { GameRoom } from 'common/types/types';
import { mapRoomToGameRoom } from 'helpers/helpers';
import { ActionType } from './action-type';
import { NotificationMessage } from 'common/enums/enums';

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
  ({ roomId }: RoomIdDto) => ({ payload: roomId }),
);

const createRoom = createAsyncThunk(
  ActionType.CREATE_ROOM,
  async (
    payload: CreateRoomRequestDto,
    { extra: { services } },
  ): Promise<ShareRoomUrlResponseDto['url']> => {
    const { racingApi: racingApiService } = services;
    const shareRoomId = await racingApiService.createRoom(payload);
    const { url } = await racingApiService.getShareRoomUrl(shareRoomId);
    return url;
  },
);

const sendRoomUrlToEmails = createAsyncThunk(
  ActionType.SEND_ROOM_URL_TO_EMAILS,
  async (
    payload: SendRoomUrlToEmailsRequestDto,
    { extra: { services } },
  ): Promise<void> => {
    const { racingApi: racingApiService, notification: notificationService } =
      services;
    await racingApiService.sendRoomUrlToEmails(payload);
    notificationService.info(NotificationMessage.SHARED_LINK_SENT);
  },
);

const resetShareRoomUrl = createAction(ActionType.RESET_SHARE_ROOM_URL);

const actions = {
  setPersonalRoom,
  loadCurrentRoom,
  setPersonalRoomAsCurrent,
  loadAvailableRooms,
  addRoomToAvailableRooms,
  removeRoomToAvailableRooms,
  createRoom,
  resetShareRoomUrl,
  sendRoomUrlToEmails,
};

export { actions };
