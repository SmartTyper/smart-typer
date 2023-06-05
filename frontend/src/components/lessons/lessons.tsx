import { ContentType, CreatorType } from 'common/enums/enums';
import { IOption } from 'common/interface/interface';
import { FC } from 'common/types/types';
import { LessonCard } from 'components/common/common';
import { ReactSelect } from 'components/external/external';
import { useDispatch, useEffect, useSelector, useState } from 'hooks/hooks';
import { lessons as lessonsActions } from 'store/modules/actions';
import {
  CONTENT_TYPE_OPTIONS,
  CREATOR_TYPE_OPTIONS,
} from './common/constants/constants';
import { getFiltersParams } from './helpers/helpers';

const Lessons: FC = () => {
  const { lessons } = useSelector(({ lessons }) => ({
    lessons: lessons.lessons,
    allLessonsCount: lessons.allLessonsCount,
  }));

  const dispatch = useDispatch();

  const [contentTypeFilter, setContentTypeFilter] = useState<
    IOption<ContentType>
  >([...CONTENT_TYPE_OPTIONS].shift()!);
  const [creatorTypeFilter, setCreatorTypeFilter] = useState<
    IOption<CreatorType>
  >([...CREATOR_TYPE_OPTIONS].shift()!);

  // const [isCreateLessonModalVisible, setIsCreateLessonModalVisible] =
  //   useState(false);

  // const handleToggleCreateLessonModalVisible = (): void => {
  //   setIsCreateLessonModalVisible((prev: boolean) => !prev);
  // };

  // const handleCreateLessonSubmit = (payload: CreateLessonRequestDto): void => {
  //   dispatch(lessonsActions.create(payload));
  //   setIsCreateLessonModalVisible(true);
  // };

  // const handleLoadMorePersonalLessons = (loadFromStart = false): void => {
  //   const params = getFiltersParams(
  //     selectedContentTypeOption,
  //     selectedCreatorTypeOption,
  //   ) as Pick<IPaginationRequest, PaginationKey.OFFSET> & LessonFilters;
  //   params.offset = loadFromStart ? DEFAULT_LESSONS_OFFSET : lessons.length;

  //   dispatch(lessonsActions.loadMoreLessons(params));
  // };

  // const handleLoadMoreOthersLessons = (loadFromStart = false): void => {
  //   const params = getFiltersParams(
  //     selectedContentTypeOption,
  //     selectedCreatorTypeOption,
  //   ) as Pick<IPaginationRequest, PaginationKey.OFFSET> & LessonFilters;
  //   params.offset = loadFromStart ? DEFAULT_LESSONS_OFFSET : lessons.length;

  //   dispatch(lessonsActions.loadMoreLessons(params));
  // };

  const handleLoadFilteredLessons = (): void => {
    const params = getFiltersParams(contentTypeFilter, creatorTypeFilter);
    dispatch(lessonsActions.loadLessons(params));
  };

  const handleContentTypeFilter = (
    selectedOption: IOption<ContentType> | null,
  ): void => {
    if (selectedOption) {
      setContentTypeFilter(selectedOption);
    }
  };

  const handleCreatorTypeFilter = (
    selectedOption: IOption<CreatorType> | null,
  ): void => {
    if (selectedOption) {
      setCreatorTypeFilter(selectedOption);
    }
  };

  useEffect(() => {
    handleLoadFilteredLessons();
  }, [contentTypeFilter, creatorTypeFilter]);

  return (
    <div>
      <ReactSelect
        options={CONTENT_TYPE_OPTIONS}
        value={contentTypeFilter}
        onChange={handleContentTypeFilter}
      />
      <ReactSelect
        options={CREATOR_TYPE_OPTIONS}
        value={creatorTypeFilter}
        onChange={handleCreatorTypeFilter}
      />
      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
      {/* <Button
        label="Create lesson"
        onClick={handleToggleCreateLessonModalVisible}
      ></Button>
      <CreateLessonModal
        isVisible={isCreateLessonModalVisible}
        onClose={handleToggleCreateLessonModalVisible}
        onSubmit={handleCreateLessonSubmit}
        // isSubmitButtonLoading
      /> */}
      {/* <ReactInfiniteScroll
        dataLength={lessons.length}
        next={handleLoadMorePersonalLessons}
        hasMore={lessons.length < allLessonsCount}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </ReactInfiniteScroll> */}
    </div>
  );
};

export { Lessons };
