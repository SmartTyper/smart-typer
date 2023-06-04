import {
  ahp as ahpAlgorithm,
  bkt as bktAlgorithm,
  irt as irtAlgorithm,
} from 'smart-typer-its/algorithms/algorithms';
import {
  BktPayload,
  BktResult,
  IrtPayload,
  IrtResult,
  AhpPayload,
  AhpResult,
} from 'common/types/types';
import {
  AhpLesson,
  AhpSkillLevel,
} from 'smart-typer-shared/common/types/types';
import { ContentType } from 'common/enums/enums';

const lessons = [
  {
    lessonId: 1,
    contentType: ContentType.SYMBOLS,
    skillsCountInLesson: [
      {
        skillId: 1,
        count: 1,
      },
      {
        skillId: 2,
        count: 2,
      },
      {
        skillId: 3,
        count: 1,
      },
      {
        skillId: 4,
        count: 1,
      },
    ],
  },
  {
    lessonId: 2,
    contentType: ContentType.WORDS,
    skillsCountInLesson: [
      {
        skillId: 1,
        count: 1,
      },
      {
        skillId: 2,
        count: 1,
      },
      {
        skillId: 3,
        count: 1,
      },
      {
        skillId: 4,
        count: 1,
      },
    ],
  },
  {
    lessonId: 3,
    contentType: ContentType.SENTENCES,
    skillsCountInLesson: [
      {
        skillId: 1,
        count: 1,
      },
      {
        skillId: 2,
        count: 1,
      },
      {
        skillId: 3,
        count: 2,
      },
      {
        skillId: 4,
        count: 1,
      },
    ],
  },
  {
    lessonId: 10,
    contentType: ContentType.SENTENCES,
    skillsCountInLesson: [
      {
        skillId: 1,
        count: 0,
      },
      {
        skillId: 2,
        count: 1,
      },
      {
        skillId: 3,
        count: 0,
      },
      {
        skillId: 4,
        count: 0,
      },
    ],
  },
  {
    lessonId: 11,
    contentType: ContentType.SENTENCES,
    skillsCountInLesson: [
      {
        skillId: 1,
        count: 2,
      },
      {
        skillId: 2,
        count: 1,
      },
      {
        skillId: 3,
        count: 0,
      },
      {
        skillId: 4,
        count: 0,
      },
    ],
  },
  {
    lessonId: 12,
    contentType: ContentType.SENTENCES,
    skillsCountInLesson: [
      {
        skillId: 1,
        count: 0,
      },
      {
        skillId: 2,
        count: 0,
      },
      {
        skillId: 3,
        count: 1,
      },
      {
        skillId: 4,
        count: 0,
      },
    ],
  },
  {
    lessonId: 13,
    contentType: ContentType.SENTENCES,
    skillsCountInLesson: [
      {
        skillId: 1,
        count: 0,
      },
      {
        skillId: 2,
        count: 2,
      },
      {
        skillId: 3,
        count: 0,
      },
      {
        skillId: 4,
        count: 0,
      },
    ],
  },
  {
    lessonId: 14,
    contentType: ContentType.SENTENCES,
    skillsCountInLesson: [
      {
        skillId: 1,
        count: 0,
      },
      {
        skillId: 2,
        count: 1,
      },
      {
        skillId: 3,
        count: 0,
      },
      {
        skillId: 4,
        count: 1,
      },
    ],
  },
] as AhpLesson[];

const lastFinishedLessonIds = [10, 11, 12, 13, 14];

const skillLevels = [
  {
    skillId: 1,
    level: 0.2,
  },
  {
    skillId: 2,
    level: 0.3,
  },
  {
    skillId: 3,
    level: 0.6,
  },
  {
    skillId: 4,
    level: 0.9,
  },
] as AhpSkillLevel[];

class ITS {
  public async bkt(payload: BktPayload): Promise<BktResult> {
    return bktAlgorithm(payload);
  }

  public async ahp(payload: AhpPayload): Promise<AhpResult> {
    return ahpAlgorithm(payload);
  }

  public async ahpTest(): Promise<AhpResult> {
    return ahpAlgorithm({ lessons, lastFinishedLessonIds, skillLevels });
  }

  public async irt(payload: IrtPayload): Promise<IrtResult> {
    return irtAlgorithm(payload);
  }
}

export { ITS };
