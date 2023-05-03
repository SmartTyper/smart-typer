import { FC } from 'common/types/types';
import { Button } from 'components/common/common';
import { ReactSelect } from 'components/external/external';
import { useDispatch, useState } from 'hooks/hooks';

const Lessons: FC = () => {
  const contentTypeOptions = [
    { value: 'all', label: 'All' },
    { value: 'symbols', label: 'Symbols' },
    { value: 'words', label: 'Words' },
    { value: 'sentences', label: 'Sentences' },
  ];

  const creatorTypeOptions = [
    { value: 'all', label: 'All' },
    { value: 'currentUser', label: 'Me' },
    { value: 'otherUsers', label: 'Others' },
    { value: 'system', label: 'System' },
  ];
  const dispatch = useDispatch();

  const [selectedContentTypeOption, setSelectedContentTypeOption] =
    useState(null);
  const [selectedCreatorTypeOption, setSelectedCreatorTypeOption] =
    useState(null);
  const [isCreateLessonModalVisible, setIsCreateLessonModalVisible] =
    useState(false);

  const handleToggleCreateLessonModalVisible = (): void => {
    setIsCreateLessonModalVisible((prev: boolean) => !prev);
  };

  const handleCreateLessonSubmit = (payload: CreateLessonRequestDto) => {
    dispatch(lessonActions.createLesson(payload));
    setIsCreateLessonModalVisible(true);
  };

  // const

  return (
    <div>
      <ReactSelect
        options={contentTypeOptions}
        isMulti
        value={selectedContentTypeOption}
        onChange={setSelectedContentTypeOption}
      />
      <ReactSelect
        options={creatorTypeOptions}
        isMulti
        value={selectedCreatorTypeOption}
        onChange={setSelectedCreatorTypeOption}
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
      {[].map(({ name, contentType, creatorType, content }, i) => (
        <div key={i}>
          <div>{name}</div>
          <div>{contentType}</div>
          <div>{creatorType}</div>
          <div>{content}</div>
        </div>
      ))}
    </div>
  );
};

export { Lessons };
