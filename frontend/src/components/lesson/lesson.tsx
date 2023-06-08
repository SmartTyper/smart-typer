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
import { lessons as lessonsActions } from 'store/modules/actions';

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

  const { name, content } = currentLesson ?? {};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const lessonId = Number(params.lessonId);
  const userId = (user as UserDto).id;

  const [isResultsModalVisible, setIsResultsModalVisible] = useState(false);
  const [position, setPosition] = useState(0);
  const [spentTime, setSpentTime] = useState(0);

  const handleIncreasePosition = (): void => {
    setPosition(position + 1);
    lessonsActions.addTimestamp(Date.now());
  };

  const handlePreservePosition = (): void => {
    lessonsActions.addMisclick(position);
  };

  const handleTypingStart = (): void => {
    lessonsActions.addTimestamp(Date.now());
  };

  const handleUserFinishedGame = (spentTime: number): void => {
    setSpentTime(spentTime);
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
            participants={[{ position, id: userId, spentTime }]}
            currentUserId={userId}
            lessonContent={content}
            isSoundTurnedOn={isSoundTurnedOn}
            onTypingStart={handleTypingStart}
            onUserFinishedGame={handleUserFinishedGame}
            onIncreasePosition={handleIncreasePosition}
            onPreservePosition={handlePreservePosition}
            onResults={handleResults}
            isGameMode
          />
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
