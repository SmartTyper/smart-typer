enum ActionType {
  SET_PERSONAL_ROOM = 'racingSetPersonalRoom',
  SET_PERSONAL_ROOM_AS_CURRENT = 'racingSetPersonalRoomAsCurrent',
  LOAD_CURRENT_ROOM = 'racingLoadCurrentRoom',
  LOAD_AVAILABLE_ROOMS = 'racingLoadAvailableRooms',
  ADD_ROOM_TO_AVAILABLE_ROOMS = 'racingAddRoomToAvailableRooms',
  REMOVE_ROOM_TO_AVAILABLE_ROOMS = 'racingRemoveRoomToAvailableRooms',
  RESET_SHARE_ROOM_URL = 'racingResetShareRoomUrl',
  CREATE_ROOM = 'racingCreateRoom',
  SEND_ROOM_URL_TO_EMAILS = 'racingSendRoomUrlToEmails',
}

export { ActionType };
