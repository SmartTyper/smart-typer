import { DEFAULT_SETTINGS } from 'common/constants/settings/settings';

const { countdownBeforeGame, gameTime } = DEFAULT_SETTINGS;

const DEFAULT_GAME_ROOM = {
  isGameStarted: false,
  commentatorText: '',
  countdownBeforeGame,
  gameTime,
  lessonContent: '',
};

export { DEFAULT_GAME_ROOM };
