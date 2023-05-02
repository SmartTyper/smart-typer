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

  const contentCreatorOptions = [
    { value: 'all', label: 'All' },
    { value: 'currentUser', label: 'Me' },
    { value: 'otherUsers', label: 'Others' },
    { value: 'system', label: 'System' },
  ];
  const dispatch = useDispatch();

  const [selectedContentTypeOption, setSelectedContentTypeOption] =
    useState(null);
  const [selectedContentCreatorOption, setSelectedContentCreatorOption] =
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
        options={contentCreatorOptions}
        isMulti
        value={selectedContentCreatorOption}
        onChange={setSelectedContentCreatorOption}
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
    </div>
  );
};

export { Lessons };
