import { CommentatorEvent, NotificationMessage } from 'common/enums/enums';
import {
  CreateRoomRequestDto,
  GameRoom,
  GameRoomWithOptionalFields,
  Participant,
  ParticipantIdDto,
  RoomDto,
  RoomIdDto,
  RoomIdUserIdDto,
  SendRoomUrlToEmailsRequestDto,
  ShareRoomUrlResponseDto,
  UserDto,
} from 'common/types/types';
import { getCommentatorText, mapRoomToGameRoom } from 'helpers/helpers';
import { createAction, createAsyncThunk } from 'store/external/external';
import { ActionType } from './action-type';

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

const resetIsLoadCurrentRoomFailed = createAction(
  ActionType.RESET_IS_LOAD_CURRENT_ROOM_FAILED,
);

const setPersonalRoomAsCurrent = createAsyncThunk(
  ActionType.SET_PERSONAL_ROOM_AS_CURRENT,
  async (_: undefined, { dispatch, getState }): Promise<void> => {
    const {
      racing: { personalRoom },
      settings: { gameTime, countdownBeforeGame },
    } = getState();
    if (!personalRoom) {
      return;
    }
    dispatch(
      setCurrentRoom({ ...personalRoom, gameTime, countdownBeforeGame }),
    );
  },
);

const setCurrentRoom = createAsyncThunk(
  ActionType.SET_CURRENT_ROOM,
  async (
    payload: GameRoomWithOptionalFields,
    { dispatch, getState },
  ): Promise<GameRoom> => {
    const { auth } = getState();
    const user = auth.user as UserDto;
    const commentatorText = getCommentatorText(CommentatorEvent.GREETING);
    const currentRoom = mapRoomToGameRoom({
      ...payload,
      commentatorText,
      participants: [...payload.participants, user],
    });
    const { id: roomId } = payload;
    const { id: participantId } = user;
    dispatch(addParticipant({ roomId, participantId }));
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

const toggleParticipantIsReady = createAction(
  ActionType.TOGGLE_PARTICIPANT_IS_READY,
  ({ participantId }: ParticipantIdDto) => ({ payload: participantId }),
);

const setSpentSeconds = createAction(
  ActionType.SET_SPENT_SECONDS,
  (payload: Pick<Participant, 'id' | 'spentSeconds'>) => ({ payload }),
);

// state.participants = state.participants.map((participant) =>
// participant.id === action.payload.id
//   ? { ...participant, spentSeconds: action.payload.spentSeconds }
//   : participant,
// );

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
  resetIsLoadCurrentRoomFailed,
  toggleParticipantIsReady,
  setSpentSeconds,
};

export { actions };
