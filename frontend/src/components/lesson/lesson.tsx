import { FC } from 'common/types/types';
import {
  useDispatch,
  useEffect,
  useParams,
  useSelector,
  useState,
} from 'hooks/hooks';
import { ResultsModal } from './components/components';
import { lessons as lessonsActions } from 'store/modules/actions';
import { mapLessonStatisticsToResults } from './helpers/helpers';

const Lesson: FC = () => {
  const { currentLesson } = useSelector(({ lessons }) => ({
    currentLesson: lessons.currentLesson,
  }));

  const [isResultsModalVisible, setIsResultsModalVisible] = useState(true);

  const handleResultsCancel = (): void => {
    setIsResultsModalVisible(false);
  };
  const dispatch = useDispatch();
  const { id: lessonId } = useParams();

  useEffect(() => {
    if (lessonId) {
      dispatch(lessonsActions.loadCurrent({ lessonId: Number(lessonId) }));
    }
  }, []);

  return currentLesson ? (
    <ResultsModal
      lessonResult={mapLessonStatisticsToResults(currentLesson)}
      isVisible={isResultsModalVisible}
      onClose={handleResultsCancel}
    ></ResultsModal>
  ) : null;
};

export { Lesson };
