import { Button, TypingCanvas, Spinner } from 'components/common/common';
import { VOICE_URI } from 'common/constants/constants';
import { AppRoute, CommentatorEvent, SpinnerSize } from 'common/enums/enums';
import { FC, UserDto } from 'common/types/types';
import {
  useParams,
  useMemo,
  useDispatch,
  useNavigate,
  useSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { Participant, ResultsModal } from './components/components';
import {
  racing as racingActions,
  lessons as lessonsActions,
} from 'store/modules/actions';
import { mapParticipantsToRating } from './helpers/helpers';

import commentatorImage from 'assets/img/commentator.gif';
import styles from './styles.module.scss';

const Room: FC = () => {
  const {
    user,
    currentRoom,
    isLoadCurrentRoomFailed,
    isSoundTurnedOn,
    lesson,
  } = useSelector(({ racing, auth, settings, lessons }) => ({
    user: auth.user,
    currentRoom: racing.currentRoom,
    isLoadCurrentRoomFailed: racing.isLoadCurrentRoomFailed,
    isSoundTurnedOn: settings.isSoundTurnedOn,
    lesson: lessons.currentLesson,
  }));

  const { commentatorText, gameTime, countdownBeforeGame, name, participants } =
    currentRoom ?? {};

  const { content } = lesson ?? {};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const roomId = Number(params.id);
  const userId = (user as UserDto).id;
  const currentParticipant = participants?.find(
    (participant) => participant.id === userId,
  );
  const allParticipantsAreReady = useMemo(
    () => participants?.every((participant) => participant.isReady),
    [participants],
  );

  const [isResultsModalVisible, setIsResultsModalVisible] = useState(false);

  const handleLeaveRoom = async (): Promise<void> => {
    dispatch(racingActions.leaveRoom({ roomId, participantId: userId }));
    dispatch(racingActions.resetAll());
    navigate(-1);
  };

  const handleIncreasePosition = (): void => {
    dispatch(
      racingActions.increaseCurrentParticipantPosition({
        participantId: userId,
        roomId,
      }),
    );

    lessonsActions.addTimestamp(Date.now());
  };

  const handlePreservePosition = (): void => {
    lessonsActions.addMisclick(currentParticipant!.position);
  };

  const handleParticipantFinishedGame = (
    spentTime: number,
    participantId: number,
  ): void => {
    dispatch(racingActions.toggleParticipantIsReady({ participantId }));
    dispatch(
      racingActions.setSpentTime({
        id: participantId,
        spentTime,
      }),
    );
  };

  const handleToggleIsReady = (): void => {
    if (currentParticipant) {
      if (!content) {
        dispatch(racingActions.addLessonId({ roomId }));
      }
      console.log(userId, roomId);
      dispatch(
        racingActions.toggleCurrentParticipantIsReady({
          participantId: userId,
          roomId,
        }),
      );
    }
  };

  const handleTypingStart = (): void => {
    lessonsActions.addTimestamp(Date.now());
  };

  const handleLoadCommentatorText = (
    gameTimerValue?: number,
    quatre?: number,
  ): void => {
    if (!gameTimerValue || !quatre) {
      racingActions.loadCommentatorText(CommentatorEvent.GAME_START);
      return;
    }
    if (gameTimerValue === quatre || gameTimerValue === 3 * quatre) {
      dispatch(racingActions.loadCommentatorText(CommentatorEvent.JOKE));
    }
    if (gameTimerValue === 2 * quatre) {
      dispatch(racingActions.loadCommentatorText(CommentatorEvent.GAME_MIDDLE));
    }
  };

  const handleResults = (): void => {
    setIsResultsModalVisible(true);
    lessonsActions.sendLessonResult();
  };

  const handleCloseResultsModal = async (): Promise<void> => {
    if (!currentRoom) {
      return;
    }
    setIsResultsModalVisible(false);
    dispatch(racingActions.resetCurrentRoomToDefault());
    dispatch(racingActions.removeLessonId({ roomId }));
  };

  const handleCommentatorTextChange = (): void => {
    if (!commentatorText) {
      return;
    }
    speechSynthesis.cancel();
    if (isSoundTurnedOn) {
      const utterance = new SpeechSynthesisUtterance(commentatorText);
      setTimeout(() => {
        utterance.voice = speechSynthesis
          .getVoices()
          .find(
            (voice) => voice.voiceURI === VOICE_URI,
          ) as SpeechSynthesisVoice;
        speechSynthesis.speak(utterance);
      }, 0);
    }
  };

  useEffect(() => {
    if (roomId) {
      dispatch(racingActions.loadCurrentRoom({ roomId }));
    }
  }, [roomId]);

  useEffect(() => {
    if (isLoadCurrentRoomFailed) {
      dispatch(racingActions.resetIsLoadCurrentRoomFailed());
      navigate(AppRoute.ROOMS);
    }
  }, [isLoadCurrentRoomFailed]);

  useEffect(handleCommentatorTextChange, [commentatorText]);

  useEffect(() => {
    return (): void => {
      speechSynthesis.cancel();
      handleLeaveRoom();
    };
  }, []);

  return (
    <div className={styles.room}>
      {!currentRoom || !currentParticipant ? (
        <Spinner size={SpinnerSize.LARGE} />
      ) : (
        <>
          <div className={styles.info}>
            <h1>{name}</h1>
            <Button
              onClick={handleLeaveRoom}
              isDisabled={allParticipantsAreReady}
              className={styles.goBackButton}
              label="Go back"
            />
            {participants!.map((participant) => (
              <Participant
                participant={participant}
                key={participant.id}
                textLength={content?.length}
                isCurrentParticipant={participant.id === currentParticipant?.id}
              />
            ))}
          </div>
          <TypingCanvas
            participants={participants!}
            currentUserId={userId}
            lessonContent={lesson?.content}
            gameTime={gameTime!}
            countdownBeforeGame={countdownBeforeGame!}
            isSoundTurnedOn={isSoundTurnedOn}
            onTypingStart={handleTypingStart}
            onLoadCommentatorText={handleLoadCommentatorText}
            onIncreasePosition={handleIncreasePosition}
            onPreservePosition={handlePreservePosition}
            onUserFinishedGame={handleParticipantFinishedGame}
            onResults={handleResults}
            onToggleIsReady={handleToggleIsReady}
            isGameMode
          />
          <div className={styles.commentator}>
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
            <div className={styles.commentatorImgContainer}>
              <img src={commentatorImage} className={styles.commentatorImg} />
            </div>
          </div>
          <ResultsModal
            participantsRating={mapParticipantsToRating(participants!)}
            isVisible={isResultsModalVisible}
            onClose={handleCloseResultsModal}
          ></ResultsModal>
        </>
      )}
    </div>
  );
};

export { Room };
