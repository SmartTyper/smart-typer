enum ActionType {
  SET_PERSONAL_ROOM = 'racingSetPersonalRoom',
  SET_PERSONAL_ROOM_AS_CURRENT = 'racingSetPersonalRoomAsCurrent',
  LOAD_CURRENT_ROOM = 'racingLoadCurrentRoom',
  SET_CURRENT_ROOM = 'setCurrentRoom',
  LOAD_AVAILABLE_ROOMS = 'racingLoadAvailableRooms',
  ADD_ROOM_TO_AVAILABLE_ROOMS = 'racingAddRoomToAvailableRooms',
  REMOVE_ROOM_TO_AVAILABLE_ROOMS = 'racingRemoveRoomToAvailableRooms',
  LOAD_SHARE_ROOM_URL = 'loadShareRoomUrl',
  RESET_SHARE_ROOM_URL = 'racingResetShareRoomUrl',
  CREATE_ROOM = 'racingCreateRoom',
  SEND_ROOM_URL_TO_EMAILS = 'racingSendRoomUrlToEmails',
  SET_COMMENTATOR_TEXT = 'racingSetCommentatorText',
}

export { ActionType };
