// import { DEFAULT_LESSONS_OFFSET } from 'common/constants/constants';
// import { IPaginationRequest } from 'common/interface/interface';
// import { CreateLessonRequestDto, FC, LessonFilters } from 'common/types/types';
// import { Button } from 'components/common/common';
// import { ReactSelect, ReactInfiniteScroll } from 'components/external/external';
// import { useDispatch, useSelector, useState } from 'hooks/hooks';
// import { lessons as lessonsActions } from 'store/modules/actions';

import { FC } from 'common/types/types';

const Lessons: FC = () => {
  // const { lessons, allLessonsCount } = useSelector((state) => state.lessons);

  // const contentTypeOptions = [
  //   { value: null, label: 'All' },
  //   { value: 'symbols', label: 'Symbols' },
  //   { value: 'words', label: 'Words' },
  //   { value: 'sentences', label: 'Sentences' },
  // ];

  // const creatorTypeOptions = [
  //   { value: null, label: 'All' },
  //   { value: 'currentUser', label: 'Me' },
  //   { value: 'otherUsers', label: 'Users' },
  //   { value: 'system', label: 'System' },
  // ];
  // const dispatch = useDispatch();

  // const [selectedContentTypeOption, setSelectedContentTypeOption] = useState(
  //   contentTypeOptions[0],
  // );
  // const [selectedCreatorTypeOption, setSelectedCreatorTypeOption] = useState(
  //   creatorTypeOptions[0],
  // );
  // const [isCreateLessonModalVisible, setIsCreateLessonModalVisible] =
  //   useState(false);

  // const handleToggleCreateLessonModalVisible = (): void => {
  //   setIsCreateLessonModalVisible((prev: boolean) => !prev);
  // };

  // const handleCreateLessonSubmit = (payload: CreateLessonRequestDto): void => {
  //   dispatch(lessonsActions.create(payload));
  //   setIsCreateLessonModalVisible(true);
  // };

  // const handleLoadMoreLessons = (loadFromStart = false): void => {
  //   const params = {} as Pick<IPaginationRequest, 'offset'> & LessonFilters;

  //   if (selectedContentTypeOption.value) {
  //     params.contentType =
  //       selectedContentTypeOption.value as LessonFilters['contentType'];
  //   }
  //   if (selectedCreatorTypeOption.value) {
  //     params.creatorType =
  //       selectedCreatorTypeOption.value as LessonFilters['creatorType'];
  //   }
  //   params.offset = loadFromStart ? DEFAULT_LESSONS_OFFSET : lessons.length;

  //   dispatch(lessonsActions.loadMoreLessons(params));
  // };

  // const handleContentTypeFilter = (selectedOption): void => {
  //   setSelectedContentTypeOption(selectedOption);
  //   handleLoadMoreLessons(true);
  // };

  // const handleCreatorTypeFilter = (selectedOption): void => {
  //   setSelectedCreatorTypeOption(selectedOption);
  //   handleLoadMoreLessons(true);
  // };

  return (
    <div>
      {/* <ReactSelect
        options={contentTypeOptions}
        isMulti
        value={selectedContentTypeOption}
        onChange={handleContentTypeFilter}
      />
      <ReactSelect
        options={creatorTypeOptions}
        isMulti
        value={selectedCreatorTypeOption}
        onChange={handleCreatorTypeFilter}
      />
      <Button
        label="Create lesson"
        onClick={handleToggleCreateLessonModalVisible}
      ></Button>
      <CreateLessonModal
        isVisible={isCreateLessonModalVisible}
        onClose={handleToggleCreateLessonModalVisible}
        onSubmit={handleCreateLessonSubmit}
        // isSubmitButtonLoading
      />
      <ReactInfiniteScroll
        dataLength={lessons.length}
        next={handleLoadMoreLessons}
        hasMore={lessons.length < allLessonsCount}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {lessons.map(({ name, contentType, creatorType, content }, i) => (
          <div key={i}>
            <div>{name}</div>
            <div>{contentType}</div>
            <div>{creatorType}</div>
            <div>{content}</div>
          </div>
        ))}
      </ReactInfiniteScroll> */}
    </div>
  );
};

export { Lessons };
