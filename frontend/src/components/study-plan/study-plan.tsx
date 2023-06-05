import { SpinnerSize } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Spinner, LessonCard } from 'components/common/common';
import { useDispatch, useEffect, useSelector } from 'hooks/hooks';
import { lessons as lessonsActions } from 'store/modules/actions';

import styles from './styles.module.scss';

const StudyPlan: FC = () => {
  const dispatch = useDispatch();
  const {
    studyPlanLessons,
    areStudyPlanLessonsLoading,
    isNextLessonGenerating,
  } = useSelector(({ lessons, requests }) => ({
    studyPlanLessons: lessons.studyPlan,
    areStudyPlanLessonsLoading: requests.lessonsLoadStudyPlan,
    isNextLessonGenerating: requests.lessonSendLessonResult,
  }));

  useEffect(() => {
    dispatch(lessonsActions.loadStudyPlan());
    return (): void => {
      dispatch(lessonsActions.resetStudyPlan());
    };
  }, []);

  return (
    <div className={styles.rooms}>
      <h1>Discover your personal study plan</h1>
      {areStudyPlanLessonsLoading ? (
        <Spinner size={SpinnerSize.LARGE} />
      ) : (
        <ol className={styles.lessonCards} role="list">
          {studyPlanLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} isStudyPlan />
          ))}
          <LessonCard
            key='next'
            isGenerating={!isNextLessonGenerating}
            isStudyPlan
          />
        </ol>
      )}
    </div>
  );
};

export { StudyPlan };
