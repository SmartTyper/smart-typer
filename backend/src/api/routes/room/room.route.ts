import { Router } from 'express';
import { room as roomService } from 'services/services';
import { Abstract } from '../abstract/abstract.route';
// import { getValidationMiddleware } from 'api/middlewares/middlewares';

type Constructor = {
  roomService: typeof roomService;
  // getValidationMiddleware: typeof getValidationMiddleware;
};

class Room extends Abstract {
  private _roomService: typeof roomService;
  // private _getValidationMiddleware: typeof getValidationMiddleware;

  public constructor(params: Constructor) {
    super();
    this._roomService = params.roomService;
    // this._getValidationMiddleware = params.getValidationMiddleware;
  }

  public getRoutes(): Router {
    const router: Router = Router();

    router.get(
      '/:roomId',
      this._run((req) => this._roomService.getById(req.params.roomId)),
    );

    router.get(
      '/',
      this._run(() => this._roomService.getAllAvailable()),
    );

    router.post(
      '/',
      this._run((req) => this._roomService.create(req.body)),
    );

    router.get(
      '/:roomId/share-url',
      this._run((req) => this._roomService.getShareUrl(req.params.roomId)),
    );

    router.post(
      '/share-url',
      this._run((req) => this._roomService.sendShareUrlToEmails(req.body)),
    );

    router.post(
      '/:roomId/participants',
      this._run((req) =>
        this._roomService.addParticipant(req.params.roomId, req.body),
      ),
    );

    router.delete(
      '/:roomId/participants/:participantId',
      this._run((req) =>
        this._roomService.removeParticipant(
          req.params.roomId,
          req.params.participantId,
        ),
      ),
    );

    router.get(
      '/:roomId/lesson-content',
      this._run((req) => this._roomService.getLessonContent(req.params.roomId)),
    );

    router.delete(
      '/:roomId/lesson-content',
      this._run((req) =>
        this._roomService.deleteLessonContent(req.params.roomId),
      ),
    );

    return router;
  }
}

export { Room };
