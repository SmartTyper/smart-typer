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
} from 'common/types/types';
import {
  its as itsService,
  user as userService,
  statistics as statisticsService,
} from 'services/services';
import { lesson as lessonRepository } from 'data/repositories/repositories';
import { HttpError } from 'exceptions/exceptions';
import {
  calculateLessonAverageSpeed,
  calculateLessonBestSkill,
  calculateStatistics,
  mapLessonResultToSkillLevelsPayload,
  mapLessonsToNextStudyPlanLessonPayload,
} from 'helpers/helpers';

type Constructor = {
  lessonRepository: typeof lessonRepository;
  itsService: typeof itsService;
  userService: typeof userService;
  statisticsService: typeof statisticsService;
};

class Lesson {
  private _lessonRepository: typeof lessonRepository;
  private _itsService: typeof itsService;
  private _userService: typeof userService;
  private _statisticsService: typeof statisticsService;

  public constructor(params: Constructor) {
    this._lessonRepository = params.lessonRepository;
    this._itsService = params.itsService;
    this._userService = params.userService;
    this._statisticsService = params.statisticsService;
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
    userId: number,
    offset: number,
    limit: number,
    contentType?: ContentType,
    creatorType?: CreatorType,
  ): Promise<IPaginationResponse<LessonDto>> {
    return this._lessonRepository.getLessons(
      userId,
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

    const skillLevelsPayload = mapLessonResultToSkillLevelsPayload({
      lesson,
      misclicks,
      timestamps,
      currentSkillLevels,
    });

    const isTestLesson = TEST_LESSON_NAMES.includes(lesson.name);
    const isLastTestLesson = lesson.name === [...TEST_LESSON_NAMES].pop();

    const resultSkillLevels = isTestLesson
      ? await this._itsService.IRT(skillLevelsPayload)
      : await this._itsService.BKT(skillLevelsPayload);

    await this._userService.updateSkillLevelsByUserId(
      userId,
      resultSkillLevels.map((skill) => ({
        id: skill.skillId,
        level: skill.pKnown,
      })),
    );

    const lessonBestSkill = calculateLessonBestSkill(
      currentSkillLevels,
      resultSkillLevels,
    );
    const lessonAverageSpeed = calculateLessonAverageSpeed(
      lesson.content,
      timestamps,
    );
    await this._lessonRepository.insertFinishedLesson(lessonId, {
      userId,
      bestSkillId: lessonBestSkill,
      averageSpeed: lessonAverageSpeed,
    });

    const oldStatistics = await this._statisticsService.getByUserId(userId);
    const { averageSpeed, todayAverageSpeed } =
      await this._lessonRepository.getAverageSpeed(userId);

    const newStatistics = calculateStatistics({
      oldStatistics,
      timestamps,
      newStatistics: { averageSpeed, todayAverageSpeed },
      lessonAverageSpeed,
    });
    await this._statisticsService.updateByUserId(userId, newStatistics);

    if (isLastTestLesson || !isTestLesson) {
      const lastFinishedLessonIds =
        await this._lessonRepository.getLastNFinishedIds(userId, 5);
      const systemLessons =
        await this._lessonRepository.getAllSystemWithSkills();

      const nextStudyPlanLessonPayload = mapLessonsToNextStudyPlanLessonPayload(
        {
          lastFinishedLessons: lastFinishedLessonIds,
          systemLessons,
        },
      );
      const { lessonId } = await this._itsService.AHP(
        nextStudyPlanLessonPayload,
      );
      await this._lessonRepository.insertNewStudyPlanLesson(userId, lessonId);
    }
  }
}

export { Lesson };
