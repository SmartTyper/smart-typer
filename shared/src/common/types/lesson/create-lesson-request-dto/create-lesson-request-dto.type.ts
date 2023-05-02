import { CreatorType, ContentType } from 'common/enums/enums';

type CreateLessonRequestDto = {
  name: string;
  contentType: ContentType;
  creatorType: CreatorType;
  creatorId: number;
  content: string;
};

export type { CreateLessonRequestDto };
