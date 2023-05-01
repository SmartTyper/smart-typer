enum SocketEvent {
  CONNECTION = 'connection',
  JOIN_ROOM = 'join-room',
  LEAVE_ROOM = 'leave-room',
  CREATE_ROOM = 'create-room',
  DELETE_ROOM = 'delete-room',
  ADD_PARTICIPANT = 'add-participant',
  REMOVE_PARTICIPANT = 'remove-participant',
  TOGGLE_PARTICIPANT_IS_READY = 'toggle-participant-is-ready',
  TOGGLE_CURRENT_PARTICIPANT_IS_READY = 'toggle-current-participant-is-ready',
  INCREASE_PARTICIPANT_POSITION = 'increase-participant-position',
  INCREASE_CURRENT_PARTICIPANT_POSITION = 'increase-current-participant-position',
}

export { SocketEvent };
