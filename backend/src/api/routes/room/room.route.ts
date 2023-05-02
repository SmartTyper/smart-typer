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
      this._run((req) => {
        const roomId = Number(req.params.roomId);
        return this._roomService.getById(roomId);
      }),
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
      this._run((req) => {
        const roomId = Number(req.params.roomId);
        return this._roomService.getShareUrl(roomId);
      }),
    );

    router.post(
      '/share-url',
      this._run((req) => this._roomService.sendShareUrlToEmails(req.body)),
    );

    router.post(
      '/:roomId/participants',
      this._run((req) => {
        const roomId = Number(req.params.roomId);
        return this._roomService.addParticipant(roomId, req.body);
      }),
    );

    router.delete(
      '/:roomId/participants/:participantId',
      this._run((req) => {
        const roomId = Number(req.params.roomId);
        const participantId = Number(req.params.participantId);
        return this._roomService.removeParticipant(roomId, participantId);
      }),
    );

    router.get(
      '/:roomId/lesson-content',
      this._run((req) => {
        const roomId = Number(req.params.roomId);
        return this._roomService.getLessonContent(roomId);
      }),
    );

    router.delete(
      '/:roomId/lesson-content',
      this._run((req) => {
        const roomId = Number(req.params.roomId);
        return this._roomService.deleteLessonContent(roomId);
      }),
    );

    return router;
  }
}

export { Room };
