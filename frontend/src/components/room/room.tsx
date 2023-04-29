import React, { MutableRefObject, KeyboardEvent } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { HttpError } from 'common/exceptions';
import { getAllowedClasses } from 'common/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useHistory,
  useParams,
  useState,
  useRef,
  useContext,
  useEffect,
  useSound,
} from 'hooks';
import { Spinner } from 'components/common';
import {
  AppRoute,
  RoomType,
  SocketEvents,
  CommentatorEvent,
} from 'common/enums';
import { DEFAULT_SECONDS_FOR_GAME, VOICE_URI } from 'common/constants';
import { IParticipant, IUser, IUserAction } from 'common/interfaces';
import { SocketContext } from 'socket';
import { gameApi, userApi } from 'services';
import { gameActions, roomActions } from 'store/actions';
import commentatorImage from 'assets/img/commentator.gif';
import { Participant, ResultModal } from './components';
import { getParticipantsRating, getCommentatorText, setTimer } from './helpers';
import styles from './styles.module.scss';

export const Game: React.FC = () => {
  const {
    participants,
    text,
    commentatorText,
    isGameStarted,
    secondsBeforeGame,
    secondsForGame,
  } = useAppSelector((state) => state.game);
  const { user } = useAppSelector((state) => state.auth);
  const { currentRoom } = useAppSelector((state) => state.room);
  const {
    secondsBeforeGame: secondsBeforePersonalGame,
    secondsForGame: secondsForPersonalGame,
  } = useAppSelector((state) => state.settings);

  const dispatch = useAppDispatch();
  const history = useHistory();
  const socket = useContext(SocketContext);

  const params = useParams<{ roomId?: string }>();
  const roomId = Number(params.roomId);

  const [currentParticipant, setCurrentParticipant] = useState<IParticipant>();
  const [isResultsModalVisible, setIsResultsModalVisible] = useState(false);

  const [playError] = useSound(`${process.env.PUBLIC_URL}/sounds/error.mp3`, {
    volume: 0.25,
  });
  const [playClockTick] = useSound(
    `${process.env.PUBLIC_URL}/sounds/clock-tick.mp3`,
    {
      volume: 0.25,
    },
  );
  const [playClockRing] = useSound(
    `${process.env.PUBLIC_URL}/sounds/clock-ring.mp3`,
    {
      volume: 0.25,
    },
  );
  const pageRef = useRef() as MutableRefObject<HTMLDivElement>;

  const onAddParticipant = (participant: IUser): void => {
    if (user?.id !== participant.id) {
      dispatch(gameActions.addParticipant(participant));
    }
  };

  const onRemoveParticipant = ({ userId }: IUserAction): void => {
    if (user?.id !== userId) {
      dispatch(gameActions.removeParticipant(userId));
    }
  };

  const onToggleParticipantIsReady = ({ userId }: IUserAction): void => {
    dispatch(gameActions.toggleIsReady(userId));
  };

  const onIncreaseParticipantPosition = ({ userId }: IUserAction): void => {
    dispatch(gameActions.increasePosition(userId));
  };

  const handleLeaveRoom = async (): Promise<void> => {
    const userId = user?.id;
    if (userId && roomId) {
      try {
        await gameApi.deleteParticipant({ roomId, userId });
        socket.emit(SocketEvents.LEAVE_ROOM, { roomId });
        dispatch(gameActions.reset());
        history.push(AppRoute.ROOT);
      } catch (err) {
        const httpError = err as HttpError;
        toast.error(httpError.message);
      }
    }
  };

  const handleKeyDown = ({ key }: KeyboardEvent<HTMLDivElement>): void => {
    if (!currentParticipant || !user || !roomId || !isGameStarted) {
      return;
    }

    const nextSymbol = text[currentParticipant?.position];
    const isRightSymbol = key === nextSymbol;
    if (isRightSymbol) {
      socket.emit(SocketEvents.INCREASE_ME_POSITION, {
        userId: user.id,
        roomId,
      });
    } else if (key !== 'Shift') {
      playError();
    }
  };

  const handleParticipantEndedGame = (userId: number): void => {
    dispatch(gameActions.toggleIsReady(userId));
    dispatch(
      gameActions.setSpentSeconds({
        id: userId,
        spentSeconds: DEFAULT_SECONDS_FOR_GAME - secondsForGame,
      }),
    );
  };

  const handleToggleIsReady = (): void => {
    if (currentParticipant) {
      if (!text) {
        dispatch(gameActions.loadText(roomId));
      }
      socket.emit(SocketEvents.TOGGLE_ME_IS_READY, {
        userId: currentParticipant.id,
        roomId,
      });
    }
  };

  const handleCloseResultsModal = async (): Promise<void> => {
    if (!currentRoom) {
      return;
    }
    setIsResultsModalVisible(false);
    dispatch(gameActions.partialReset());
    try {
      await gameApi.deleteText(currentRoom.id);
    } catch (err) {
      const httpError = err as HttpError;
      toast.error(httpError.message);
    }
  };

  useEffect(() => {
    if (
      currentRoom?.type === RoomType.PERSONAL &&
      secondsForPersonalGame &&
      secondsBeforePersonalGame &&
      !text
    ) {
      dispatch(gameActions.setSecondsForGame(secondsForPersonalGame));
      dispatch(gameActions.setSecondsBeforeGame(secondsBeforePersonalGame));
    }
  }, [
    currentRoom?.type,
    secondsBeforePersonalGame,
    secondsForPersonalGame,
    text,
  ]);

  useEffect(() => {
    const userId = user?.id;
    if (userId && roomId) {
      dispatch(roomActions.loadRoom(roomId));
      const text = getCommentatorText(CommentatorEvent.GREETING);
      dispatch(gameActions.setCommentatorText(text));
      gameApi
        .addParticipant({ roomId, userId })
        .then(() => {
          dispatch(gameActions.loadParticipants(roomId));
          socket.emit(SocketEvents.JOIN_ROOM, { roomId });
        })
        .catch((err) => {
          const httpError = err as HttpError;
          toast.error(httpError.message);
          history.push(AppRoute.ROOMS);
        });
    }
  }, [roomId, user?.id]);

  useEffect(() => {
    const current = participants.find(
      (participant) => participant.id === user?.id,
    );
    setCurrentParticipant(current);

    const allParticipantsAreReady = participants.every(
      (participant) => participant.isReady,
    );
    const allParticipantsEndedGame = participants.every(
      (participant) => participant.spentSeconds,
    );
    const needToStartGame = !isGameStarted && allParticipantsAreReady;
    const needToFinishGame = isGameStarted && allParticipantsEndedGame;
    if (participants.length && (needToStartGame || needToFinishGame)) {
      dispatch(gameActions.toggleIsGameStarted());
    }

    const { length } = text;
    if (length) {
      participants.forEach((participant) => {
        if (participant.position === length && !participant.spentSeconds) {
          handleParticipantEndedGame(participant.id);
        }
      });
    }
  }, [participants]);

  useEffect(() => {
    if (isGameStarted) {
      const text = getCommentatorText(
        CommentatorEvent.GAME_START,
        participants,
      );
      dispatch(gameActions.setCommentatorText(text));
      const decreaseSecondsBeforeGame = (): void => {
        dispatch(gameActions.decreaseSecondsBeforeGame());
      };
      playClockTick();
      setTimer(secondsBeforeGame, decreaseSecondsBeforeGame);
    } else if (currentParticipant) {
      playClockRing();
      setIsResultsModalVisible(true);
    }
  }, [isGameStarted]);

  useEffect(() => {
    if (!isGameStarted && currentParticipant?.spentSeconds) {
      playClockRing();
      setIsResultsModalVisible(true);
      const { position, spentSeconds } = currentParticipant;
      userApi.updateRecord(position / spentSeconds).catch((err) => {
        const httpError = err as HttpError;
        toast.error(httpError.message);
      });
    }
  }, [isGameStarted, currentParticipant]);

  useEffect(() => {
    if (!secondsBeforeGame) {
      playClockRing();
      pageRef.current.focus();
      const decreaseSecondsForGame = (): void => {
        dispatch(gameActions.decreaseSecondsForGame());
      };
      setTimer(secondsForGame, decreaseSecondsForGame);
    } else if (isGameStarted) {
      playClockTick();
    }
  }, [secondsBeforeGame]);

  useEffect(() => {
    if (!secondsForGame && isGameStarted) {
      participants.forEach((participant) => {
        if (!participant.spentSeconds) {
          handleParticipantEndedGame(participant.id);
        }
      });
      dispatch(gameActions.toggleIsGameStarted());
    }
    const quatre = DEFAULT_SECONDS_FOR_GAME / 4;
    if (secondsForGame === quatre || secondsForGame === 3 * quatre) {
      dispatch(gameActions.loadCommentatorJoke());
    }
    if (secondsForGame === 2 * quatre) {
      const text = getCommentatorText(
        CommentatorEvent.GAME_MIDDLE,
        participants,
      );
      dispatch(gameActions.setCommentatorText(text));
    }
  }, [secondsForGame]);

  useEffect(() => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(commentatorText);
    setTimeout(() => {
      utterance.voice = speechSynthesis
        .getVoices()
        .find((voice) => voice.voiceURI === VOICE_URI) as SpeechSynthesisVoice;
      speechSynthesis.speak(utterance);
    }, DEFAULT_SECONDS_FOR_GAME);
  }, [commentatorText]);

  useEffect(() => {
    socket.on(SocketEvents.ADD_PARTICIPANT, onAddParticipant);
    socket.on(SocketEvents.REMOVE_PARTICIPANT, onRemoveParticipant);
    socket.on(
      SocketEvents.TOGGLE_PARTICIPANT_IS_READY,
      onToggleParticipantIsReady,
    );
    socket.on(
      SocketEvents.INCREASE_PARTICIPANT_POSITION,
      onIncreaseParticipantPosition,
    );

    return (): void => {
      speechSynthesis.cancel();
      handleLeaveRoom();
      socket.off(SocketEvents.ADD_PARTICIPANT, onAddParticipant);
      socket.off(SocketEvents.REMOVE_PARTICIPANT, onRemoveParticipant);
      socket.off(
        SocketEvents.TOGGLE_PARTICIPANT_IS_READY,
        onToggleParticipantIsReady,
      );
      socket.off(
        SocketEvents.INCREASE_PARTICIPANT_POSITION,
        onIncreaseParticipantPosition,
      );
    };
  }, []);

  return (
    <div
      className={styles.container}
      onKeyDown={handleKeyDown}
      ref={pageRef}
      tabIndex={0}
    >
      {!user?.id || !roomId ? (
        <Spinner height={'12rem'} width={'12rem'} />
      ) : (
        <>
          <div className={getAllowedClasses('d-flex flex-column', styles.info)}>
            <h1>{currentRoom?.name}</h1>
            <Button
              variant="success"
              size="lg"
              onClick={handleLeaveRoom}
              disabled={isGameStarted}
              className="w-50"
            >
              Back to home page
            </Button>
            {participants.length ? (
              participants.map((participant) => (
                <Participant
                  participant={participant}
                  key={participant.id}
                  textLength={text.length}
                  isCurrentParticipant={
                    participant.id === currentParticipant?.id
                  }
                />
              ))
            ) : (
              <Spinner height={'6rem'} width={'6rem'} />
            )}
          </div>
          <div
            className={getAllowedClasses(
              'd-flex flex-column justify-content-center align-items-center shadow',
              styles.field,
            )}
          >
            {currentParticipant &&
              (isGameStarted ? (
                secondsBeforeGame ? (
                  <span className="position-absolute top-50 start-51 fs-1">
                    {secondsBeforeGame}
                  </span>
                ) : (
                  <>
                    <p className="d-flex justify-content-center position-absolute top-0 start-40">
                      {secondsForGame === 1
                        ? `${secondsForGame} second left`
                        : `${secondsForGame} seconds left`}
                    </p>
                    <p>
                      <span className="bg-success">
                        {text.slice(0, currentParticipant.position)}
                      </span>
                      <span>{text.slice(currentParticipant.position)}</span>
                    </p>
                  </>
                )
              ) : (
                <Button
                  variant={currentParticipant?.isReady ? 'danger' : 'success'}
                  size="lg"
                  onClick={handleToggleIsReady}
                >
                  {currentParticipant?.isReady ? 'Not ready' : 'Ready'}
                </Button>
              ))}
          </div>
          <div
            className={getAllowedClasses(
              'd-flex flex-column',
              styles.commentator,
            )}
          >
            <div className={styles.speechBubble}>
              {commentatorText.split('\n').map((line) => {
                return (
                  <React.Fragment key={line}>
                    {line}
                    <br />
                  </React.Fragment>
                );
              })}
            </div>
            <div className="d-flex justify-content-end align-self-end">
              <img src={commentatorImage} />
            </div>
          </div>
        </>
      )}
      <ResultModal
        participantsRating={getParticipantsRating(participants)}
        onModalClose={handleCloseResultsModal}
        showModal={isResultsModalVisible}
      />
    </div>
  );
};
