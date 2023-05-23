import { TEST_LESSON_NAMES } from 'common/constants/constants';
import {
  ContentType,
  CreatorType,
  HttpCode,
  HttpErrorMessage,
} from 'common/enums/enums';
import { IPaginationResponse } from 'common/interfaces/interfaces';
import {
  LessonDto,
  LessonResponseDto,
  CreateLessonRequestDto,
  SkillsStatisticsDto,
  BktResult,
  IrtResult,
  Skill,
} from 'common/types/types';
import { its as itsService, user as userService } from 'services/services';
import { lesson as lessonRepository } from 'data/repositories/repositories';
import { HttpError } from 'exceptions/exceptions';
import {
  calculateLessonAverageSpeed,
  calculateLessonBestSkill,
  calculateStatistics,
} from 'helpers/helpers';

type Constructor = {
  lessonRepository: typeof lessonRepository;
  itsService: typeof itsService;
  userService: typeof userService;
};

class Lesson {
  private _lessonRepository: typeof lessonRepository;
  private _itsService: typeof itsService;
  private _userService: typeof userService;

  public constructor(params: Constructor) {
    this._lessonRepository = params.lessonRepository;
    this._itsService = params.itsService;
    this._userService = params.userService;
  }

  public async getById(lessonId: number): Promise<LessonResponseDto> {
    const lesson = await this._lessonRepository.getById(lessonId);

    if (!lesson) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_LESSON_WITH_SUCH_ID,
      });
    }
    return lesson;
  }

  public async create(
    payload: CreateLessonRequestDto,
  ): Promise<LessonResponseDto> {
    return this._lessonRepository.create(payload);
  }

  public async getMore(
    offset: number,
    limit: number,
    contentType?: ContentType,
    creatorType?: CreatorType,
  ): Promise<IPaginationResponse<LessonDto>> {
    return this._lessonRepository.getLessons(
      offset,
      limit,
      contentType,
      creatorType,
    );
  }

  public async getStudyPlan(userId: number): Promise<LessonDto[]> {
    const areTestLessons = true;
    const testLessons = await this._lessonRepository.getStudyPlanByUserId(
      userId,
      areTestLessons,
    );
    const passedTestLessons = testLessons.filter(
      (testLesson) => testLesson.bestSkill,
    );
    if (passedTestLessons.length === TEST_LESSON_NAMES.length) {
      return this._lessonRepository.getStudyPlanByUserId(userId);
    } else {
      return testLessons;
    }
  }

  public async handleLessonResult(
    userId: number,
    lessonId: number,
    payload: SkillsStatisticsDto,
  ): Promise<void> {
    // map to skills
    const { misclicks, timestamps } = payload;
    const lesson = await this._lessonRepository.getByIdWithSkills(lessonId);
    const currentSkillLevels =
      await this._userService.getCurrentSkillLevelsByUserId(userId);

    if (!lesson) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_LESSON_WITH_SUCH_ID,
      });
    }

    const isTestLesson = TEST_LESSON_NAMES.includes(lesson.name);
    const isLastTestLesson = lesson.name === [...TEST_LESSON_NAMES].pop();

    const resultSkillLevels = isTestLesson
      ? await this._itsService.IRT(payload)
      : await this._itsService.BKT(payload);
    // update pKnown(skill_level) in user_to_skills table

    // calculate lesson best skill
    const lessonBestSkill = calculateLessonBestSkill(
      currentSkillLevels,
      resultSkillLevels,
    );
    // calculate lesson average speed
    const lessonAverageSpeed = calculateLessonAverageSpeed(
      lesson.content,
      timestamps,
    );
    // => save lessonId to finishedLessons

    const oldStatistics = await this._statisticsService.getByUserId(userId);
    const { averageSpeed, todayAverageSpeed } =
      await this._lessonRepository.getAverageSpeed(userId);

    const newStatistics = calculateStatistics({
      oldStatistics,
      timestamps,
      newStatistics: { averageSpeed, todayAverageSpeed },
      lessonAverageSpeed,
    });
    await this._statisticsService.updateByUserId(newStatistics);

    if (isLastTestLesson || !isTestLesson) {
      const { lessonId } = await this._itsService.AHP(payload);
      await this._lessonRepository.insertNewStudyPlanLesson(userId, lessonId);
    }
    console.log(lessonId, payload);
    return;
  }
}

export { Lesson };
