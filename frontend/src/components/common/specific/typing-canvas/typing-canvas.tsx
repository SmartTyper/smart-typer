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
import { useEffect, useRef, useSound, useState } from 'hooks/hooks';
import { clsx } from 'helpers/helpers';
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
  onUserFinishedGame?: (
    spentTime: number,
    participantId: UserDto[CommonKey.ID],
  ) => void;
  onUserFinishedLesson?: () => void;
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
  onUserFinishedLesson,
  onResults,
  onToggleIsReady = VOID_ACTION,
  isGameMode = false,
}) => {
  console.log(participants);
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

  const handleDecreaseTimerBeforeGameValue = (timerValue: number): void => {
    console.log(timerBeforeTypingValue);
    if (timerBeforeTypingValue) {
      setTimerBeforeTypingValue(timerValue);
      if (isSoundTurnedOn) {
        playClockTick();
      }
    }
  };

  const handleDecreaseGameTimerValue = (timerValue: number): void => {
    if (gameTimerValue) {
      setGameTimerValue(timerValue);
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
    if (!isStarted) {
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
    if (!participants.length) {
      return;
    }

    const allParticipantsEndedGame = participants.every(
      (participant) => participant.spentTime,
    );
    const needToFinishGame = isStarted && allParticipantsEndedGame;
    if (needToFinishGame) {
      setIsStarted(false);
    }

    if (lessonContent?.length) {
      const { length } = lessonContent;
      participants.forEach((participant) => {
        const participantTypedAllText = participant.position === length;
        const participantNotSetSpentTime = !participant.spentTime;
        if (participantTypedAllText && participantNotSetSpentTime) {
          console.log('yes');
          if (isGameMode) {
            onUserFinishedGame!(
              gameTimerInitialValue! - gameTimerValue!,
              participant.id,
            );
          } else {
            onUserFinishedLesson!();
          }
        }
      });
    }

    if (!isGameMode) {
      return;
    }

    const allParticipantsAreReady = participants.every(
      (participant) => participant.isReady,
    );
    const needToStartGame = !isStarted && allParticipantsAreReady;
    if (needToStartGame) {
      setIsStarted(true);
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
        timerBeforeTypingValue as number,
        handleDecreaseTimerBeforeGameValue,
      );
      return;
    }
    console.log({ isStarted, spentTime });
    if (!isStarted && spentTime) {
      if (isSoundTurnedOn) {
        playClockRing();
      }
      handleResetTimerValues();
      onResults();
    }
  };

  const handleTimerBeforeTypingChange = (): void => {
    console.log(timerBeforeTypingValue, isStarted);
    if (!timerBeforeTypingValue && isStarted) {
      onTypingStart();
      if (isSoundTurnedOn) {
        playClockRing();
      }
      pageRef.current.focus();
      if (isSoundTurnedOn) {
        playClockTick();
      }
      if (isGameMode) {
        setTimer(gameTimerValue as number, handleDecreaseGameTimerValue);
      }
    }
  };

  const handleGameTimerChange = (): void => {
    if (!gameTimerValue && isStarted && isGameMode) {
      (participants as Participant[]).forEach((participant) => {
        const hadFinishGameBeforeDeadline = participant.spentTime;
        if (!hadFinishGameBeforeDeadline) {
          console.log('yes1');
          if (isGameMode) {
            onUserFinishedGame!(
              gameTimerInitialValue! - gameTimerValue!,
              participant.id,
            );
          } else {
            onUserFinishedLesson!();
          }
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
      className={styles.typingCanvas}
    >
      {isStarted ? (
        timerBeforeTypingValue ? (
          <span className={styles.timerBeforeTyping}>
            {timerBeforeTypingValue}
          </span>
        ) : (
          <>
            {isGameMode && (
              <p className={styles.gameTimer}>
                {gameTimerValue === 1
                  ? `${gameTimerValue} second left`
                  : `${gameTimerValue} seconds left`}
              </p>
            )}
            <p>
              <span className={styles.correctTyped}>
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
          className={clsx(
            styles.readyButton,
            currentParticipant.isReady ? styles.ready : styles.notReady,
          )}
        />
      )}
    </div>
  );
};

export { TypingCanvas };
