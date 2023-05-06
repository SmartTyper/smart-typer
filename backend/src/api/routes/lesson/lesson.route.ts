import { Router } from 'express';
import { lesson as lessonService } from 'services/services';
import { Abstract } from '../abstract/abstract.route';
import { IRequestWithUser } from 'common/interfaces/interfaces';
import { SkillsStatisticsDto } from 'common/types/types';
// import { getValidationMiddleware } from 'api/middlewares/middlewares';

type Constructor = {
  lessonService: typeof lessonService;
  // getValidationMiddleware: typeof getValidationMiddleware;
};

class Lesson extends Abstract {
  private _lessonService: typeof lessonService;
  // private _getValidationMiddleware: typeof getValidationMiddleware;

  public constructor(params: Constructor) {
    super();
    this._lessonService = params.lessonService;
    // this._getValidationMiddleware = params.getValidationMiddleware;
  }

  public getRoutes(): Router {
    const router: Router = Router();

    router.get(
      '/:lessonId',
      this._run((req) => {
        const lessonId = Number(req.params.lessonId);
        return this._lessonService.getById(lessonId);
      }),
    );

    router.post(
      '/',
      this._run((req) => this._lessonService.create(req.body)),
    );

    router.get(
      '/',
      this._run((req) => {
        const { offset, limit, contentType, creatorType } = req.query;
        return this._lessonService.getMore(
          offset,
          limit,
          contentType,
          creatorType,
        );
      }),
    );

    router.get(
      '/study-plan',
      this._run((req: IRequestWithUser) =>
        this._lessonService.getStudyPlan(req.userId),
      ),
    );

    router.post(
      '/:lessonId/result',
      this._run((req) => {
        const lessonId = Number(req.params.lessonId);
        return this._lessonService.handleLessonResult(lessonId, req.body);
      }),
    );

    return router;
  }
}

export { Lesson };
