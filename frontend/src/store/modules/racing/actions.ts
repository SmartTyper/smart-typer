import { CommentatorEvent, NotificationMessage } from 'common/enums/enums';
import {
  CreateRoomRequestDto,
  GameRoom,
  GameRoomWithOptionalFields,
  LessonDto,
  Participant,
  ParticipantIdDto,
  RoomDto,
  RoomIdDto,
  RoomIdParticipantIdDto,
  SendRoomUrlToEmailsRequestDto,
  ShareRoomUrlDto,
  UserDto,
} from 'common/types/types';
import {
  getGameCommentatorText,
  mapGameRoomToDefault,
  mapRoomToGameRoom,
  mapUserToParticipant,
} from 'helpers/helpers';
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
    const { roomApi: roomApiService } = services;
    const room = await roomApiService.get(payload);
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
    { dispatch },
  ): Promise<GameRoom> => {
    const currentRoom = mapRoomToGameRoom(payload);
    const { id: roomId } = payload;
    dispatch(joinRoom({ roomId }));
    dispatch(loadCommentatorText(CommentatorEvent.GREETING));
    return currentRoom;
  },
);

const joinRoom = createAsyncThunk(
  ActionType.SET_CURRENT_ROOM,
  async (
    payload: RoomIdDto,
    { dispatch, getState, extra: { services } },
  ): Promise<RoomIdDto> => {
    const { auth } = getState();
    const user = auth.user as UserDto;
    const { roomApi: roomApiService } = services;
    const { roomId } = payload;
    const { id: participantId } = user;
    await roomApiService.addParticipant({ roomId, participantId });
    dispatch(addParticipant(user));
    return payload;
  },
);

const leaveRoom = createAsyncThunk(
  ActionType.SET_CURRENT_ROOM,
  async (
    payload: RoomIdParticipantIdDto,
    { dispatch, extra: { services } },
  ): Promise<RoomIdDto> => {
    const { roomApi: roomApiService } = services;
    const { participantId, roomId } = payload;
    await roomApiService.removeParticipant(payload);
    dispatch(removeParticipant({ participantId }));
    return { roomId };
  },
);

const loadAvailableRooms = createAsyncThunk(
  ActionType.LOAD_AVAILABLE_ROOMS,
  async (_: undefined, { extra: { services } }): Promise<RoomDto[]> => {
    const { roomApi: roomApiService } = services;
    return roomApiService.getAllAvailable();
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
    const { roomApi: roomApiService } = services;
    const { roomId } = await roomApiService.create(payload);
    dispatch(loadShareRoomUrl({ roomId }));
  },
);

const loadShareRoomUrl = createAsyncThunk(
  ActionType.LOAD_SHARE_ROOM_URL,
  async (
    payload: RoomIdDto,
    { extra: { services } },
  ): Promise<ShareRoomUrlDto['url']> => {
    const { roomApi: roomApiService } = services;
    const { url } = await roomApiService.getShareUrl(payload);
    return url;
  },
);

const sendRoomUrlToEmails = createAsyncThunk(
  ActionType.SEND_ROOM_URL_TO_EMAILS,
  async (
    payload: SendRoomUrlToEmailsRequestDto,
    { extra: { services } },
  ): Promise<void> => {
    const { roomApi: roomApiService, notification: notificationService } =
      services;
    await roomApiService.sendShareUrlToEmails(payload);
    notificationService.info(NotificationMessage.SHARED_LINK_SENT);
  },
);

const resetShareRoomUrl = createAction(ActionType.RESET_SHARE_ROOM_URL);

const addParticipant = createAction(
  ActionType.ADD_PARTICIPANT,
  (payload: Omit<UserDto, 'email'>) => ({
    payload: mapUserToParticipant(payload),
  }),
);

const removeParticipant = createAction(
  ActionType.REMOVE_PARTICIPANT,
  ({ participantId }: ParticipantIdDto) => ({ payload: participantId }),
);

const toggleParticipantIsReady = createAction(
  ActionType.TOGGLE_PARTICIPANT_IS_READY,
  ({ participantId }: ParticipantIdDto) => ({ payload: participantId }),
);

const increaseParticipantPosition = createAction(
  ActionType.REMOVE_PARTICIPANT,
  ({ participantId }: ParticipantIdDto) => ({ payload: participantId }),
);

const setSpentSeconds = createAction(
  ActionType.SET_SPENT_SECONDS,
  (payload: Pick<Participant, 'id' | 'spentSeconds'>) => ({ payload }),
);

const loadCommentatorText = createAsyncThunk(
  ActionType.SET_PERSONAL_ROOM_AS_CURRENT,
  async (
    payload: CommentatorEvent,
    { getState, extra: { services } },
  ): Promise<Pick<GameRoom, 'commentatorText'>> => {
    const {
      racing: { currentRoom },
    } = getState();
    const { jokeApi: jokeApiService } = services;
    if (payload === CommentatorEvent.JOKE) {
      const { joke } = await jokeApiService.getRandom();
      return { commentatorText: joke };
    }
    const commentatorText = getGameCommentatorText(
      payload,
      currentRoom?.participants,
    );
    return { commentatorText };
  },
);

const increaseCurrentParticipantPosition = createAction(
  ActionType.INCREASE_CURRENT_PARTICIPANT_POSITION,
  (payload: RoomIdParticipantIdDto) => ({ payload }),
);

const toggleCurrentParticipantIsReady = createAction(
  ActionType.INCREASE_CURRENT_PARTICIPANT_POSITION,
  (payload: RoomIdParticipantIdDto) => ({ payload }),
);

const loadLessonContent = createAsyncThunk(
  ActionType.LOAD_SHARE_ROOM_URL,
  async (
    payload: RoomIdDto,
    { extra: { services } },
  ): Promise<Pick<LessonDto, 'content'>> => {
    const { roomApi: roomApiService } = services;
    const { content } = await roomApiService.getLessonContent(payload);
    return { content };
  },
);

const deleteLessonContent = createAsyncThunk(
  ActionType.LOAD_SHARE_ROOM_URL,
  async (payload: RoomIdDto, { extra: { services } }): Promise<void> => {
    const { roomApi: roomApiService } = services;
    await roomApiService.deleteLessonContent(payload);
  },
);

const resetAll = createAction(ActionType.RESET_ALL);

const resetToDefault = createAsyncThunk(
  ActionType.RESET_ALL_TO_DEFAULT,
  async (_: undefined, { getState }): Promise<void | GameRoom> => {
    const {
      racing: { currentRoom },
    } = getState();
    return currentRoom ? mapGameRoomToDefault(currentRoom) : undefined;
  },
);

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
  loadCommentatorText,
  setCurrentRoom,
  resetIsLoadCurrentRoomFailed,
  loadShareRoomUrl,
  addParticipant,
  removeParticipant,
  toggleParticipantIsReady,
  setSpentSeconds,
  increaseParticipantPosition,
  joinRoom,
  leaveRoom,
  increaseCurrentParticipantPosition,
  toggleCurrentParticipantIsReady,
  loadLessonContent,
  deleteLessonContent,
  resetAll,
  resetToDefault,
};

export { actions };