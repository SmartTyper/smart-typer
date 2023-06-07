import { TypingCanvas, Spinner } from 'components/common/common';
import { AppRoute, SpinnerSize } from 'common/enums/enums';
import { clsx } from 'helpers/helpers';
import { FC, UserDto } from 'common/types/types';
import {
  useParams,
  useDispatch,
  useNavigate,
  useSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { ResultsModal } from './components/components';
import {  lessons as lessonsActions } from 'store/modules/actions';

import commentatorImage from 'assets/img/commentator.gif';
import styles from './styles.module.scss';
import { mapLessonStatisticsToResults } from './helpers/helpers';

const Lesson: FC = () => {
  const { user, isLoadCurrentRoomFailed, isSoundTurnedOn, currentLesson } =
    useSelector(({ racing, auth, settings, lessons }) => ({
      user: auth.user,
      currentRoom: racing.currentRoom,
      isLoadCurrentRoomFailed: racing.isLoadCurrentRoomFailed,
      isSoundTurnedOn: settings.isSoundTurnedOn,
      currentLesson: lessons.currentLesson,
    }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const lessonId = Number(params.lessonId);
  const userId = (user as UserDto).id;

  const [isResultsModalVisible, setIsResultsModalVisible] = useState(false);

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
    lessonsActions.addMisclick(position);
  };

  const handleTypingStart = (): void => {
    lessonsActions.addTimestamp(Date.now());
  };

  const handleResults = (): void => {
    setIsResultsModalVisible(true);
    lessonsActions.sendLessonResult();
  };

  const handleCloseResultsModal = async (): Promise<void> => {
    setIsResultsModalVisible(false);
    navigate(-1);
  };

  useEffect(() => {
    if (lessonId) {
      dispatch(lessonsActions.loadCurrent({ lessonId }));
    }
  }, [lessonId]);

  useEffect(() => {
    if (isLoadCurrentRoomFailed) {
      dispatch(lessonsActions.resetIsLoadCurrentLessonFailed());
      navigate(AppRoute.ROOMS);
    }
  }, [isLoadCurrentRoomFailed]);

  return (
    <div className={styles.container}>
      {!currentLesson ? (
        <Spinner size={SpinnerSize.LARGE} />
      ) : (
        <>
          <div className={clsx('d-flex flex-column', styles.info)}>
            <h1>{name}</h1>
          </div>
          <TypingCanvas
            participants={participants!}
            currentUserId={userId}
            lessonContent={content}
            isSoundTurnedOn={isSoundTurnedOn}
            onTypingStart={handleTypingStart}
            onIncreasePosition={handleIncreasePosition}
            onPreservePosition={handlePreservePosition}
            onResults={handleResults}
            isGameMode
          />
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
          <ResultsModal
            lessonResult={mapLessonStatisticsToResults(currentLesson)}
            isVisible={isResultsModalVisible}
            onClose={handleCloseResultsModal}
          ></ResultsModal>
        </>
      )}
    </div>
  );
};

export { Lesson };
