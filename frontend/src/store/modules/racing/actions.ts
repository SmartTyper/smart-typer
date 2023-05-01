import { createAsyncThunk, createAction } from 'store/external/external';
import {
  CreateRoomRequestDto,
  RoomDto,
  RoomIdDto,
  ShareRoomUrlResponseDto,
  SendRoomUrlToEmailsRequestDto,
  RoomIdUserIdDto,
} from 'common/types/types';

import { mapRoomToGameRoom, getCommentatorText } from 'helpers/helpers';
import { ActionType } from './action-type';
import { CommentatorEvent, NotificationMessage } from 'common/enums/enums';

const setPersonalRoom = createAction(
  ActionType.SET_PERSONAL_ROOM,
  (payload: RoomDto) => ({ payload }),
);

const loadCurrentRoom = createAsyncThunk(
  ActionType.LOAD_CURRENT_ROOM,
  async (
    payload: RoomIdDto,
    { dispatch, extra: { services } },
  ): Promise<void> => {
    const { racingApi: racingApiService } = services;
    const room = await racingApiService.getRoom(payload);
    dispatch(setCurrentRoom(room));
  },
);

const setPersonalRoomAsCurrent = createAction(
  ActionType.SET_PERSONAL_ROOM_AS_CURRENT,
  (_: undefined, { state }) => {
    const currentRoom = mapRoomToGameRoom(state.personalRoom);
    return { payload: currentRoom };
  },
);

const setCurrentRoom = createAction(
  ActionType.SET_CURRENT_ROOM,
  (payload: RoomDto, { dispatch, state }) => {
    const commentatorText = getCommentatorText(CommentatorEvent.GREETING);
    const currentRoom = mapRoomToGameRoom({ ...payload, commentatorText });
    const { id: roomId } = payload;
    const { id: userId } = state.auth.user;
    dispatch(addParticipant({ roomId, userId }));
    return { payload: currentRoom };
  },
);

const loadAvailableRooms = createAsyncThunk(
  ActionType.LOAD_AVAILABLE_ROOMS,
  async (_: undefined, { extra: { services } }): Promise<RoomDto[]> => {
    const { racingApi: racingApiService } = services;
    return racingApiService.getAvailableRooms();
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
    { dispatch, extra: { services } },
  ): Promise<void> => {
    const { racingApi: racingApiService } = services;
    const { roomId } = await racingApiService.createRoom(payload);
    dispatch(loadShareRoomUrl({ roomId }));
  },
);

const loadShareRoomUrl = createAsyncThunk(
  ActionType.LOAD_SHARE_ROOM_URL,
  async (
    payload: RoomIdDto,
    { extra: { services } },
  ): Promise<ShareRoomUrlResponseDto['url']> => {
    const { racingApi: racingApiService } = services;
    const { url } = await racingApiService.getShareRoomUrl(payload);
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

const addParticipant = createAsyncThunk(
  ActionType.ADD_PARTICIPANT,
  async (payload: RoomIdUserIdDto, { extra: { services } }): Promise<void> => {
    const { racingApi: racingApiService } = services;
    await racingApiService.addParticipant(payload);
  },
);

// const setCommentatorText = createAction(
//   ActionType.SET_PERSONAL_ROOM_AS_CURRENT,
//   (payload: CommentatorEvent, { state }) => {
//     const currentRoom = mapRoomToGameRoom(state.personalRoom);
//     return { payload: currentRoom };
//   },
// );s

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
  // setCommentatorText,
  setCurrentRoom,
  loadShareRoomUrl,
  addParticipant,
};

export { actions };
