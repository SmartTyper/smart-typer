enum ActionType {
  CREATE = 'lessonsCreate',
  DELETE = 'lessonsDelete',
  LOAD_CURRENT = 'lessonsLoadCurrent',
  LOAD_MORE_LESSONS = 'lessonsLoadMoreLessons',
  LOAD_LESSONS = 'lessonsLoadLessons',
  ADD_LESSON = 'lessonsAddLesson',
  RESET_ALL = 'lessonsResetAll',
  RESET_STUDY_PLAN = 'lessonsResetStudyPlan',
  RESET_CURRENT_LESSON = 'lessonsResetCurrentLesson',
  LOAD_STUDY_PLAN = 'lessonsLoadStudyPlan',
  ADD_MISCLICK = 'lessonAddMisclick',
  ADD_TIMESTAMP = 'lessonAddTimestamp',
  SEND_LESSON_RESULT = 'lessonSendLessonResult',
  RESET_IS_LOAD_CURRENT_LESSON_FAILED = 'lessonsResetIsLoadCurrentLessonFailed',
}

export { ActionType };
