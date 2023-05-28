import { Router } from 'express';
import { lesson as lessonService } from 'services/services';
import { Abstract } from '../abstract/abstract.route';
import { IRequestWithUser } from 'common/interfaces/interfaces';
import { ContentType, CreatorType } from 'common/enums/enums';
import { getValidationMiddleware } from 'api/middlewares/middlewares';
import { createLessonSchema } from 'validation-schemas/validation-schemas';

type Constructor = {
  lessonService: typeof lessonService;
  getValidationMiddleware: typeof getValidationMiddleware;
};

class Lesson extends Abstract {
  private _lessonService: typeof lessonService;
  private _getValidationMiddleware: typeof getValidationMiddleware;

  public constructor(params: Constructor) {
    super();
    this._lessonService = params.lessonService;
    this._getValidationMiddleware = params.getValidationMiddleware;
  }

  public getRoutes(): Router {
    const router: Router = Router();

    router.post(
      '/',
      this._getValidationMiddleware({ body: createLessonSchema }),
      this._run((req: IRequestWithUser) => {
        return this._lessonService.create(req.userId, req.body);
      }),
    );

    router.get(
      '/study-plan',
      this._run((req: IRequestWithUser) => {
        return this._lessonService.getStudyPlan(req.userId);
      }),
    );

    router.post(
      '/:lessonId/result',
      this._run((req: IRequestWithUser) => {
        const lessonId = Number(req.params.lessonId);
        return this._lessonService.handleLessonResult(
          req.userId,
          lessonId,
          req.body,
        );
      }),
    );

    router.get(
      '/:lessonId',
      this._run((req) => {
        const lessonId = Number(req.params.lessonId);
        return this._lessonService.getById(lessonId);
      }),
    );

    router.get(
      '/',
      this._run((req: IRequestWithUser) => {
        const { offset, limit, contentType, creatorType } = req.query;
        return this._lessonService.getMore(
          req.userId,
          Number(offset),
          Number(limit),
          contentType as ContentType,
          creatorType as CreatorType,
        );
      }),
    );

    // delete lesson

    return router;
  }
}

export { Lesson };
