import { TEST_LESSON_NAMES } from 'common/constants/constants';
import {
  CommonKey,
  ContentType,
  CreatorType,
  HttpCode,
  HttpErrorMessage,
  SkillKey,
} from 'common/enums/enums';
import { IPaginationResponse } from 'common/interfaces/interfaces';
import {
  LessonDto,
  LessonResponseDto,
  CreateLessonRequestDto,
  SkillsStatisticsDto,
  Skill,
  UserDto,
  FinishedLesson,
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

  public async getById(
    lessonId: LessonDto[CommonKey.ID],
  ): Promise<LessonResponseDto> {
    const lesson = await this._lessonRepository.getById(lessonId);

    if (!lesson) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_LESSON_WITH_SUCH_ID,
      });
    }
    return lesson;
  }

  public async deleteById(
    userId: UserDto[CommonKey.ID],
    lessonId: LessonDto[CommonKey.ID],
  ): Promise<void> {
    const deletedLessonId = await this._lessonRepository.deleteByIdAndOwnerId(
      userId,
      lessonId,
    );

    if (!deletedLessonId) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.NO_LESSON_WITH_SUCH_ID,
      });
    }
  }

  public async create(
    userId: UserDto[CommonKey.ID],
    payload: CreateLessonRequestDto,
  ): Promise<LessonResponseDto> {
    return this._lessonRepository.create(userId, payload);
  }

  public async getMore(
    userId: UserDto[CommonKey.ID],
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

  public async getStudyPlan(
    userId: UserDto[CommonKey.ID],
  ): Promise<LessonDto[]> {
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

  private async _upsertFinishedLesson(
    lessonId: LessonDto[CommonKey.ID],
    payload: FinishedLesson,
  ): Promise<void> {
    const { userId, bestSkillId, averageSpeed } = payload;
    const finishedLesson =
      await this._lessonRepository.getFinishedByIdAndUserId(lessonId, userId);

    if (finishedLesson) {
      await this._lessonRepository.updateFinishedLesson(lessonId, {
        userId,
        bestSkillId,
        averageSpeed,
      });
    } else {
      await this._lessonRepository.insertFinishedLesson(lessonId, {
        userId,
        bestSkillId,
        averageSpeed,
      });
    }
  }

  public async handleLessonResult(
    userId: UserDto[CommonKey.ID],
    lessonId: LessonDto[CommonKey.ID],
    payload: SkillsStatisticsDto,
  ): Promise<void> {
    const { misclicks, timestamps } = payload;
    const lesson = await this._lessonRepository.getByIdWithSkills(lessonId);
    if (!lesson) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_LESSON_WITH_SUCH_ID,
      });
    }

    const currentSkillLevels =
      await this._userService.getCurrentSkillLevelsByUserId(userId);

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
      })) as Omit<Skill, SkillKey.NAME>[],
    );

    const lessonBestSkill = calculateLessonBestSkill(
      currentSkillLevels,
      resultSkillLevels,
    );

    const lessonAverageSpeed = calculateLessonAverageSpeed(
      lesson.content,
      timestamps,
    );

    await this._upsertFinishedLesson(lessonId, {
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

    const { priority, lessonId: lastStudyPlanLessonId } =
      await this._lessonRepository.getLastStudyPlanLessonPriority(userId);

    if (
      (isLastTestLesson || !isTestLesson) &&
      lastStudyPlanLessonId === lessonId
    ) {
      const lastFinishedLessonIds =
        await this._lessonRepository.getLastNFinishedIds(userId, 5);

      const systemLessons =
        await this._lessonRepository.getSystemWithoutTestWithSkills();

      const nextStudyPlanLessonPayload = mapLessonsToNextStudyPlanLessonPayload(
        {
          lastFinishedLessons: lastFinishedLessonIds,
          systemLessons,
        },
      );

      const { lessonId } = await this._itsService.AHP(
        nextStudyPlanLessonPayload,
      );

      await this._lessonRepository.insertNewStudyPlanLesson(
        userId,
        lessonId,
        priority + 1,
      );
    }
  }
}

export { Lesson };
