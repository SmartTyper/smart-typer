import {
  AlphabetLetter,
  ContentType,
  CreatorType,
  FormFieldLabel,
  FormFieldType,
  PaginationKey,
  SpinnerSize,
} from 'common/enums/enums';
import { IOption, IPaginationRequest } from 'common/interface/interface';
import { CreateLessonRequestDto, FC, LessonFilters } from 'common/types/types';
import {
  Button,
  FormField,
  ArMarkerModal,
  LessonCard,
  Select,
  Spinner,
} from 'components/common/common';
import { useDispatch, useEffect, useSelector, useState } from 'hooks/hooks';
import { lessons as lessonsActions } from 'store/modules/actions';
import {
  CONTENT_TYPE_OPTIONS,
  CREATOR_TYPE_OPTIONS,
} from './common/constants/constants';
import { getFiltersParams } from './helpers/helpers';
import { CategoryWrapper, CreateLessonModal } from './components/components';
import { ReactInfiniteScroll } from 'components/external/external';

import styles from './styles.module.scss';

const FIRST_ARR_ELEM_INDEX = 0;

const Lessons: FC = () => {
  const { lessons, isLessonCreating, allLessonsCount } = useSelector(
    ({ lessons, requests }) => ({
      lessons: lessons.lessons,
      allLessonsCount: lessons.allLessonsCount,
      isLessonCreating: requests.lessonsCreate,
    }),
  );

  const dispatch = useDispatch();

  const [contentTypeFilter, setContentTypeFilter] = useState<
    IOption<ContentType>
  >([...CONTENT_TYPE_OPTIONS].shift()!);
  const [creatorTypeFilter, setCreatorTypeFilter] = useState<
    IOption<CreatorType>
  >([...CREATOR_TYPE_OPTIONS].shift()!);

  const areFiltersSet = !!(contentTypeFilter.value || creatorTypeFilter.value);

  const [isCreateLessonModalVisible, setIsCreateLessonModalVisible] =
    useState(false);

  const handleToggleCreateLessonModalVisible = (): void => {
    setIsCreateLessonModalVisible((prev: boolean) => !prev);
  };

  const handleCreateLessonSubmit = (payload: CreateLessonRequestDto): void => {
    dispatch(lessonsActions.create(payload));
    setIsCreateLessonModalVisible(false);
  };

  const handleLoadMoreLessons = (): void => {
    const params = getFiltersParams(
      contentTypeFilter,
      creatorTypeFilter,
    ) as Pick<IPaginationRequest, PaginationKey.OFFSET> & LessonFilters;
    params.offset = lessons.length;

    dispatch(lessonsActions.loadMoreLessons(params));
  };

  const handleLoadFilteredLessons = (): void => {
    const params = getFiltersParams(contentTypeFilter, creatorTypeFilter);
    dispatch(lessonsActions.loadLessons(params));
  };

  useEffect(() => {
    handleLoadFilteredLessons();
  }, [contentTypeFilter, creatorTypeFilter]);

  console.log(lessons.length, allLessonsCount);

  return (
    <div className={styles.lessons}>
      <div className={styles.actions}>
        <FormField
          label={FormFieldLabel.CONTENT_TYPE}
          type={FormFieldType.CUSTOM}
          className={styles.filter}
        >
          <Select<ContentType>
            options={CONTENT_TYPE_OPTIONS}
            value={contentTypeFilter}
            onChange={setContentTypeFilter}
          />
        </FormField>
        <FormField
          label={FormFieldLabel.CREATOR_TYPE}
          type={FormFieldType.CUSTOM}
          className={styles.filter}
        >
          <Select<CreatorType>
            options={CREATOR_TYPE_OPTIONS}
            value={creatorTypeFilter}
            onChange={setCreatorTypeFilter}
          />
        </FormField>
        <Button
          label="Create lesson"
          onClick={handleToggleCreateLessonModalVisible}
          className={styles.createLessonButton}
        ></Button>
      </div>
      <ReactInfiniteScroll
        dataLength={lessons.length}
        next={handleLoadMoreLessons}
        hasMore={lessons.length < allLessonsCount}
        loader={
          <div className={styles.spinnerContainer}>
            <Spinner size={SpinnerSize.SMALL} isCentered={false} />
          </div>
        }
        className={styles.infiniteScroll}
      >
        <div className={styles.lessonCards}>
          {areFiltersSet
            ? lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))
            : lessons.map((lesson, i, lessons) => (
              <CategoryWrapper
                key={lesson.id}
                currentLessonCreatorType={lesson.creatorType}
                prevLessonCreatorType={
                  i !== FIRST_ARR_ELEM_INDEX
                    ? lessons[i - 1].creatorType
                    : undefined
                }
              >
                <LessonCard lesson={lesson} />
              </CategoryWrapper>
            ))}
        </div>
      </ReactInfiniteScroll>
      <CreateLessonModal
        isVisible={isCreateLessonModalVisible}
        onClose={handleToggleCreateLessonModalVisible}
        onSubmit={handleCreateLessonSubmit}
        isSubmitting={isLessonCreating}
      />
      <ArMarkerModal
        onClose={(): void => {
          console.log();
        }}
        isVisible
        bestSkillSymbol={AlphabetLetter.A}
      />
    </div>
  );
};

export { Lessons };
