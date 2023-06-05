// import { KeyboardEvent, MutableRefObject } from 'react';
// import { Button } from 'components/common/common';
// import { DEFAULT_SETTINGS, VOICE_URI } from 'common/constants/constants';
// import { AppRoute, CommentatorEvent, SpinnerSize } from 'common/enums/enums';
// import { clsx } from 'helpers/helpers';
// import { FC, Participant } from 'common/types/types';
// import { UserDto } from 'common/types/types';
// import { Spinner } from 'components/common/common';
// import {
//   useParams,
//   useRef,
//   useSound,
//   useDispatch,
//   useNavigate,
//   useSelector,
//   useEffect,
//   useState,
// } from 'hooks/hooks';
// import { Participant as ParticipantItem, ResultModal } from './components';
// import { getParticipantsRating, setTimer } from './helpers';
// import { racing as racingActions } from 'store/modules/actions';

import { FC } from 'common/types/types';
import {
  useDispatch,
  useEffect,
  useParams,
  useSelector,
  useState,
} from 'hooks/hooks';
import { ResultsModal } from './components/components';
import { mapParticipantsToRating } from './helpers/helpers';
import { racing as racingActions } from 'store/modules/actions';

// import commentatorImage from 'assets/img/commentator.gif';
// import styles from './styles.module.scss';

const Room: FC = () => {
  const { participants } = useSelector(({ racing }) => ({
    participants: racing.currentRoom?.participants,
    // user: auth.user,
  }));

  const [isResultsModalVisible, setIsResultsModalVisible] = useState(true);

  const handleResultsCancel = (): void => {
    setIsResultsModalVisible(false);
  };
  const dispatch = useDispatch();
  const { id: roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      dispatch(racingActions.loadCurrentRoom({ roomId: Number(roomId) }));
    }
  }, []);
  // const { user, currentRoom, isLoadCurrentRoomFailed, isSoundTurnedOn } =
  //   useSelector(({ racing, auth, settings }) => ({
  //     user: auth.user,
  //     currentRoom: racing.currentRoom,
  //     isLoadCurrentRoomFailed: racing.isLoadCurrentRoomFailed,
  //     isSoundTurnedOn: settings.isSoundTurnedOn,
  //   }));

  // const {
  //   commentatorText,
  //   gameTime,
  //   countdownBeforeGame,
  //   name,
  //   participants,
  //   lesson,
  // } = currentRoom ?? {};

  // const { content, timestamps, misclicks } = lesson ?? {};

  // const {
  //   gameTime: defaultGameTime,
  //   countdownBeforeGame: defaultCountdownBeforeGame,
  // } = DEFAULT_SETTINGS;

  // const [isGameStarted, setIsGameStarted] = useState(false);
  // const [gameTimerValue, setGameTimerValue] = useState(
  //   gameTime ?? defaultGameTime,
  // );
  // const [timerBeforeGameValue, setTimerBeforeGameValue] = useState(
  //   countdownBeforeGame ?? defaultCountdownBeforeGame,
  // );

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const params = useParams();
  // const roomId = Number(params.roomId);
  // const userId = (user as UserDto).id;
  // const currentParticipant = participants?.find(
  //   (participant) => participant.id === userId,
  // );

  // const [isResultsModalVisible, setIsResultsModalVisible] = useState(false);

  // const [playError] = useSound(`${process.env.PUBLIC_URL}/sounds/error.mp3`, {
  //   volume: 0.25,
  // });
  // const [playClockTick] = useSound(
  //   `${process.env.PUBLIC_URL}/sounds/clock-tick.mp3`,
  //   {
  //     volume: 0.25,
  //   },
  // );
  // const [playClockRing] = useSound(
  //   `${process.env.PUBLIC_URL}/sounds/clock-ring.mp3`,
  //   {
  //     volume: 0.25,
  //   },
  // );
  // const pageRef = useRef() as MutableRefObject<HTMLDivElement>;

  // const decreaseTimerBeforeGameValue = (): void => {
  //   setGameTimerValue((prev) => prev - 1);
  //   playClockTick();
  // };

  // const decreaseGameTimerValue = (): void => {
  //   setTimerBeforeGameValue((prev) => prev - 1);
  //   playClockTick();
  // };

  // const resetTimerValues = (): void => {
  //   setTimerBeforeGameValue(countdownBeforeGame ?? defaultCountdownBeforeGame);
  //   setGameTimerValue(gameTime ?? defaultGameTime);
  // };

  // const handleLeaveRoom = async (): Promise<void> => {
  //   if (roomId) {
  //     dispatch(racingActions.leaveRoom({ roomId, participantId: userId }));
  //     dispatch(racingActions.resetAll());
  //     navigate(AppRoute.ROOT);
  //   }
  // };

  // const handleKeyDown = ({ key }: KeyboardEvent<HTMLDivElement>): void => {
  //   if (!currentParticipant || !isGameStarted) {
  //     return;
  //   }

  //   const nextSymbol = (content as string)[currentParticipant?.position];
  //   const isRightSymbol = key === nextSymbol;
  //   if (isRightSymbol) {
  //     dispatch(
  //       racingActions.increaseCurrentParticipantPosition({
  //         participantId: userId,
  //         roomId,
  //       }),
  //     );
  //   } else if (key !== 'Shift') {
  //     playError();
  //   }
  // };

  // const handleParticipantFinishedGame = (participantId: number): void => {
  //   dispatch(racingActions.toggleParticipantIsReady({ participantId }));
  //   dispatch(
  //     racingActions.setSpentTime({
  //       id: userId,
  //       spentTime: defaultGameTime - gameTimerValue,
  //     }),
  //   );
  // };

  // const handleToggleIsReady = (): void => {
  //   if (currentParticipant) {
  //     if (!content) {
  //       dispatch(racingActions.loadLessonContent({ roomId }));
  //     }
  //     dispatch(
  //       racingActions.toggleCurrentParticipantIsReady({
  //         participantId: userId,
  //         roomId,
  //       }),
  //     );
  //   }
  // };

  // const handleCloseResultsModal = async (): Promise<void> => {
  //   if (!currentRoom) {
  //     return;
  //   }
  //   setIsResultsModalVisible(false);
  //   dispatch(racingActions.resetCurrentRoomToDefault());
  //   dispatch(racingActions.deleteLessonContent({ roomId }));
  // };

  // useEffect(() => {
  //   if (roomId) {
  //     dispatch(racingActions.loadCurrentRoom({ roomId }));
  //   }
  // }, [roomId]);

  // useEffect(() => {
  //   if (isLoadCurrentRoomFailed) {
  //     dispatch(racingActions.resetIsLoadCurrentRoomFailed());
  //     navigate(AppRoute.ROOMS);
  //   }
  // }, [isLoadCurrentRoomFailed]);

  // useEffect(() => {
  //   if (!participants?.length) {
  //     return;
  //   }

  //   const allParticipantsAreReady = participants.every(
  //     (participant) => participant.isReady,
  //   );
  //   const allParticipantsEndedGame = participants.every(
  //     (participant) => participant.spentTime,
  //   );
  //   const needToStartGame = !isGameStarted && allParticipantsAreReady;
  //   const needToFinishGame = isGameStarted && allParticipantsEndedGame;
  //   if (needToStartGame || needToFinishGame) {
  //     setIsGameStarted((prev) => !prev);
  //   }

  //   if (content?.length) {
  //     const { length } = content;
  //     participants.forEach((participant) => {
  //       const participantTypedAllText = participant.position === length;
  //       const participantSpentSomeTime = !participant.spentTime;
  //       if (participantTypedAllText && participantSpentSomeTime) {
  //         handleParticipantFinishedGame(participant.id);
  //       }
  //     });
  //   }
  // }, [participants]);

  // useEffect(() => {
  //   const { position, spentTime } = currentParticipant ?? {};
  //   if (isGameStarted && !spentTime) {
  //     dispatch(racingActions.loadCommentatorText(CommentatorEvent.GAME_START));
  //     playClockTick();
  //     setTimer(countdownBeforeGame as number, decreaseTimerBeforeGameValue);
  //     return;
  //   }
  //   if (!isGameStarted && spentTime) {
  //     playClockRing();
  //     resetTimerValues();
  //     setIsResultsModalVisible(true);
  //     alert(position);
  //     // todo userApi.updateRecord((position as number) / spentTime);
  //   }
  // }, [isGameStarted, currentParticipant?.spentTime]);

  // useEffect(() => {
  //   if (!timerBeforeGameValue && isGameStarted) {
  //     playClockRing();
  //     pageRef.current.focus();
  //     playClockTick();
  //     setTimer(gameTime as number, decreaseGameTimerValue);
  //   }
  // }, [timerBeforeGameValue]);

  // useEffect(() => {
  //   if (!gameTimerValue && isGameStarted) {
  //     (participants as Participant[]).forEach((participant) => {
  //       const hadFinishGameBeforeDeadline = participant.spentTime;
  //       if (!hadFinishGameBeforeDeadline) {
  //         handleParticipantFinishedGame(participant.id);
  //       }
  //     });
  //   }
  //   const quatre = defaultGameTime / 4;
  //   if (gameTimerValue === quatre || gameTimerValue === 3 * quatre) {
  //     dispatch(racingActions.loadCommentatorText(CommentatorEvent.JOKE));
  //   }
  //   if (gameTimerValue === 2 * quatre) {
  //     dispatch(racingActions.loadCommentatorText(CommentatorEvent.GAME_MIDDLE));
  //   }
  // }, [gameTimerValue]);

  // useEffect(() => {
  //   if (!commentatorText) {
  //     return;
  //   }
  //   speechSynthesis.cancel();
  //   if (isSoundTurnedOn) {
  //     const utterance = new SpeechSynthesisUtterance(commentatorText);
  //     setImmediate(() => {
  //       utterance.voice = speechSynthesis
  //         .getVoices()
  //         .find(
  //           (voice) => voice.voiceURI === VOICE_URI,
  //         ) as SpeechSynthesisVoice;
  //       speechSynthesis.speak(utterance);
  //     });
  //   }
  // }, [commentatorText]);

  // useEffect(() => {
  //   return (): void => {
  //     speechSynthesis.cancel();
  //     handleLeaveRoom();
  //   };
  // }, []);

  console.log(participants);

  return participants ? (
    <ResultsModal
      participantsRating={mapParticipantsToRating(participants)}
      isVisible={isResultsModalVisible}
      onClose={handleResultsCancel}
    ></ResultsModal>
  ) : null;
  /* <div
      className={styles.container}
      onKeyDown={handleKeyDown}
      ref={pageRef}
      tabIndex={0}
    >
      {!currentRoom ? (
        <Spinner size={SpinnerSize.MEDIUM} />
      ) : (
        <>
          <div className={clsx('d-flex flex-column', styles.info)}>
            <h1>{name}</h1>
            <Button
              onClick={handleLeaveRoom}
              isDisabled={isGameStarted}
              className="w-50"
            >
              Back to home page
            </Button>
            {participants?.length ? (
              participants.map((participant) => (
                <ParticipantItem
                  participant={participant}
                  key={participant.id}
                  textLength={(content as string).length}
                  isCurrentParticipant={
                    participant.id === currentParticipant?.id
                  }
                />
              ))
            ) : (
              <Spinner size={SpinnerSize.MEDIUM} />
            )}
          </div>
          <div
            className={clsx(
              'd-flex flex-column justify-content-center align-items-center shadow',
              styles.field,
            )}
          >
            {currentParticipant &&
              (isGameStarted ? (
                timerBeforeGameValue ? (
                  <span className="position-absolute top-50 start-51 fs-1">
                    {timerBeforeGameValue}
                  </span>
                ) : (
                  <>
                    <p className="d-flex justify-content-center position-absolute top-0 start-40">
                      {timerBeforeGameValue === 1
                        ? `${timerBeforeGameValue} second left`
                        : `${timerBeforeGameValue} seconds left`}
                    </p>
                    <p>
                      <span className="bg-success">
                        {(content as string).slice(
                          0,
                          currentParticipant.position,
                        )}
                      </span>
                      <span>
                        {(content as string).slice(currentParticipant.position)}
                      </span>
                    </p>
                  </>
                )
              ) : (
                <Button onClick={handleToggleIsReady}>
                  {currentParticipant?.isReady ? 'Not ready' : 'Ready'}
                </Button>
              ))}
          </div>
          <div className={clsx('d-flex flex-column', styles.commentator)}>
            <div className={styles.speechBubble}>
              {(commentatorText as string).split('\n').map((line) => {
                return (
                  <>
                    {line}
                    <br />
                  </>
                );
              })}
            </div>
            <div className="d-flex justify-content-end align-self-end">
              <img src={commentatorImage} />
            </div>
          </div>
        </>
      )}
      {!!participants && (
        <ResultModal
          participantsRating={getParticipantsRating(participants)}
          onModalClose={handleCloseResultsModal}
          showModal={isResultsModalVisible}
        />
      )}
    </div> */
  // );
};

export { Room };
