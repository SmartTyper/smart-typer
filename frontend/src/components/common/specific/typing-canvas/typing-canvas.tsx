import {
  DEFAULT_COUNTDOWN_BEFORE_LESSON,
  DEFAULT_SETTINGS,
  VOID_ACTION,
} from 'common/constants/constants';
import { CommonKey, ParticipantKey, SettingsKey } from 'common/enums/enums';
import {
  FC,
  MutableRefObject,
  Participant,
  SettingsDto,
  UserDto,
  KeyboardEvent,
  VoidAction,
} from 'common/types/types';
import { Button } from 'components/common/common';
import { clsx } from 'helpers/helpers';
import { useEffect, useRef, useSound, useState } from 'hooks/hooks';
import { setTimer } from './helpers/helpers';

import styles from './styles.module.scss';

type Typer = {
  [ParticipantKey.POSITION]: Participant[ParticipantKey.POSITION];
  [ParticipantKey.IS_READY]?: Participant[ParticipantKey.IS_READY];
  [ParticipantKey.SPENT_TIME]: Participant[ParticipantKey.SPENT_TIME];
  [CommonKey.ID]: Participant[CommonKey.ID];
};

type Props = {
  participants: Typer[];
  currentUserId: UserDto[CommonKey.ID];
  onResults: VoidAction;
  onIncreasePosition: VoidAction;
  onPreservePosition: VoidAction;
  onTypingStart: VoidAction;
  isSoundTurnedOn: SettingsDto[SettingsKey.IS_SOUND_TURNED_ON];
  onUserFinishedGame: (
    spentTime: number,
    participantId: UserDto[CommonKey.ID],
  ) => void;
  isGameMode?: boolean;
  lessonContent?: string;
  gameTime?: SettingsDto[SettingsKey.GAME_TIME];
  countdownBeforeGame?: SettingsDto[SettingsKey.GAME_TIME];
  onLoadCommentatorText?: (gameTimerValue?: number, quatre?: number) => void;
  onToggleIsReady?: VoidAction;
};

const TypingCanvas: FC<Props> = ({
  participants,
  currentUserId,
  lessonContent,
  gameTime,
  countdownBeforeGame,
  isSoundTurnedOn,
  onLoadCommentatorText,
  onIncreasePosition,
  onPreservePosition,
  onTypingStart,
  onUserFinishedGame,
  onResults,
  onToggleIsReady = VOID_ACTION,
  isGameMode = false,
}) => {
  const {
    gameTime: defaultGameTime,
    countdownBeforeGame: defaultCountdownBeforeGame,
  } = DEFAULT_SETTINGS;

  const gameTimerInitialValue = isGameMode ? gameTime ?? defaultGameTime : null;
  const timerBeforeTypingInitialValue = isGameMode
    ? countdownBeforeGame ?? defaultCountdownBeforeGame
    : DEFAULT_COUNTDOWN_BEFORE_LESSON;

  const [isStarted, setIsStarted] = useState(!isGameMode);
  const [gameTimerValue, setGameTimerValue] = useState(gameTimerInitialValue);
  const [timerBeforeTypingValue, setTimerBeforeTypingValue] = useState(
    timerBeforeTypingInitialValue,
  );

  const currentParticipant = participants.find(
    (participant) => participant.id === currentUserId,
  )!;

  const [playError] = useSound('../../../../assets/sound/error.mp3', {
    volume: 0.25,
  });
  const [playClockTick] = useSound('../../../../assets/sound/clock-tick.mp3', {
    volume: 0.25,
  });
  const [playClockRing] = useSound('../../../../assets/sound/clock-ring.mp3', {
    volume: 0.25,
  });
  const pageRef = useRef() as MutableRefObject<HTMLDivElement>;

  const handleDecreaseTimerBeforeGameValue = (): void => {
    if (timerBeforeTypingValue) {
      setGameTimerValue(timerBeforeTypingValue - 1);
      if (isSoundTurnedOn) {
        playClockTick();
      }
    }
  };

  const handleDecreaseGameTimerValue = (): void => {
    if (gameTimerValue) {
      setGameTimerValue(gameTimerValue - 1);
      if (isSoundTurnedOn) {
        playClockTick();
      }
    }
  };

  const handleResetTimerValues = (): void => {
    setTimerBeforeTypingValue(timerBeforeTypingInitialValue);
    setGameTimerValue(gameTimerInitialValue);
  };

  const handleKeyDown = ({ key }: KeyboardEvent<HTMLDivElement>): void => {
    if (!currentParticipant || !isStarted) {
      return;
    }

    const nextSymbol = (lessonContent as string)[currentParticipant.position];
    const isRightSymbol = key === nextSymbol;
    if (isRightSymbol) {
      onIncreasePosition();
    } else if (key !== 'Shift') {
      onPreservePosition();
      if (isSoundTurnedOn) {
        playError();
      }
    }
  };

  const handleParticipantsChange = (): void => {
    if (!participants.length || !isGameMode) {
      return;
    }

    const allParticipantsAreReady = participants.every(
      (participant) => participant.isReady,
    );
    const allParticipantsEndedGame = participants.every(
      (participant) => participant.spentTime,
    );
    const needToStartGame = !isStarted && allParticipantsAreReady;
    const needToFinishGame = isStarted && allParticipantsEndedGame;
    if (needToStartGame || needToFinishGame) {
      setIsStarted((prev) => !prev);
    }

    if (lessonContent?.length) {
      const { length } = lessonContent;
      participants.forEach((participant) => {
        const participantTypedAllText = participant.position === length;
        const participantNotSetSpentTime = !participant.spentTime;
        if (participantTypedAllText && participantNotSetSpentTime) {
          onUserFinishedGame(
            participant.id,
            gameTimerInitialValue! - gameTimerValue!,
          );
        }
      });
    }
  };

  const handleStartedStateChange = (): void => {
    const { spentTime } = currentParticipant;
    if (isStarted && !spentTime) {
      if (onLoadCommentatorText) {
        onLoadCommentatorText();
      }
      if (isSoundTurnedOn) {
        playClockTick();
      }
      setTimer(
        countdownBeforeGame as number,
        handleDecreaseTimerBeforeGameValue,
      );
      return;
    }
    if (!isStarted && spentTime) {
      if (isSoundTurnedOn) {
        playClockRing();
      }
      handleResetTimerValues();
      onResults();
    }
  };

  const handleTimerBeforeTypingChange = (): void => {
    if (!timerBeforeTypingValue && isStarted) {
      onTypingStart();
      if (isSoundTurnedOn) {
        playClockRing();
      }
      pageRef.current.focus();
      if (isSoundTurnedOn) {
        playClockTick();
      }
      setTimer(gameTime as number, handleDecreaseGameTimerValue);
    }
  };

  const handleGameTimerChange = (): void => {
    if (!gameTimerValue && isStarted) {
      (participants as Participant[]).forEach((participant) => {
        const hadFinishGameBeforeDeadline = participant.spentTime;
        if (!hadFinishGameBeforeDeadline) {
          onUserFinishedGame(
            participant.id,
            gameTimerInitialValue! - gameTimerValue!,
          );
        }
      });
    }
    if (gameTimerValue && onLoadCommentatorText) {
      const quatre = gameTime ?? defaultGameTime / 4;
      onLoadCommentatorText(gameTimerValue, quatre);
    }
  };

  useEffect(handleParticipantsChange, [participants]);
  useEffect(handleStartedStateChange, [
    isStarted,
    currentParticipant.spentTime,
  ]);
  useEffect(handleTimerBeforeTypingChange, [timerBeforeTypingValue]);
  useEffect(handleGameTimerChange, [gameTimerValue]);

  return (
    <div
      ref={pageRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={clsx(
        'd-flex flex-column justify-content-center align-items-center shadow',
        styles.field,
      )}
    >
      {isStarted || !isGameMode ? (
        timerBeforeTypingValue ? (
          <span className="position-absolute top-50 start-51 fs-1">
            {timerBeforeTypingValue}
          </span>
        ) : (
          <>
            {isGameMode && (
              <p className="d-flex justify-content-center position-absolute top-0 start-40">
                {gameTimerValue === 1
                  ? `${gameTimerValue} second left`
                  : `${gameTimerValue} seconds left`}
              </p>
            )}
            <p>
              <span className="bg-success">
                {(lessonContent as string).slice(
                  0,
                  currentParticipant.position,
                )}
              </span>
              <span>
                {(lessonContent as string).slice(currentParticipant.position)}
              </span>
            </p>
          </>
        )
      ) : (
        <Button
          onClick={onToggleIsReady}
          label={currentParticipant.isReady ? 'Not ready' : 'Ready'}
        />
      )}
    </div>
  );
};

export { TypingCanvas };
