enum ActionType {
  CREATE = 'lessonsCreate',
  LOAD_CURRENT = 'lessonsLoadCurrent',
  LOAD_MORE_LESSONS = 'lessonsLoadMoreLessons',
  ADD_LESSON = 'lessonsAddLesson',
  RESET_ALL = 'lessonsResetAll',
  RESET_CURRENT_LESSON = 'lessonsResetCurrentLesson',
  LOAD_STUDY_PLAN = 'lessonsLoadStudyPlan',
  ADD_MISCLICK = 'lessonAddMisclick',
  ADD_TIMESTAMP = 'lessonAddTimestamp',
  SEND_LESSON_RESULT = 'lessonSendLessonResult',
}

export { ActionType };
