import { Router } from 'express';
import { room as roomService } from 'services/services';
import { Abstract } from '../abstract/abstract.route';
import { IRequestWithUser } from 'common/interfaces/interfaces';
import { getValidationMiddleware } from 'api/middlewares/middlewares';
import {
  addRoomLessonIdParamsSchema,
  addRoomParticipantParamsSchema,
  createRoomBodySchema,
  getRoomParamsSchema,
  getRoomShareUrlParamsSchema,
  removeRoomLessonIdParamsSchema,
  removeRoomParticipantParamsSchema,
  sendShareRoomUrlBodySchema,
} from 'validation-schemas/validation-schemas';

type Constructor = {
  roomService: typeof roomService;
  getValidationMiddleware: typeof getValidationMiddleware;
};

class Room extends Abstract {
  private _roomService: typeof roomService;
  private _getValidationMiddleware: typeof getValidationMiddleware;

  public constructor(params: Constructor) {
    super();
    this._roomService = params.roomService;
    this._getValidationMiddleware = params.getValidationMiddleware;
  }

  public getRoutes(): Router {
    const router: Router = Router();

    router.get(
      '/:roomId/share-url',
      this._getValidationMiddleware({ params: getRoomShareUrlParamsSchema }),
      this._run((req) => {
        const roomId = Number(req.params.roomId);
        return this._roomService.getShareUrl(roomId);
      }),
    );

    router.post(
      '/share-url',
      this._getValidationMiddleware({ body: sendShareRoomUrlBodySchema }),
      this._run((req: IRequestWithUser) => {
        const userId = req.userId;
        return this._roomService.sendShareUrlToEmails(userId, req.body);
      }),
    );

    router.post(
      '/:roomId/participants',
      this._getValidationMiddleware({ params: addRoomParticipantParamsSchema }),
      this._run((req: IRequestWithUser) => {
        const roomId = Number(req.params.roomId);
        return this._roomService.addParticipant(roomId, req.userId);
      }),
    );

    router.delete(
      '/:roomId/participants',
      this._getValidationMiddleware({
        params: removeRoomParticipantParamsSchema,
      }),
      this._run((req: IRequestWithUser) => {
        const roomId = Number(req.params.roomId);
        return this._roomService.removeParticipant(roomId, req.userId);
      }),
    );

    router.post(
      '/:roomId/lesson',
      this._getValidationMiddleware({ params: addRoomLessonIdParamsSchema }),
      this._run((req) => {
        const roomId = Number(req.params.roomId);
        return this._roomService.addLessonId(roomId);
      }),
    );

    router.delete(
      '/:roomId/lesson',
      this._getValidationMiddleware({ params: removeRoomLessonIdParamsSchema }),
      this._run((req) => {
        const roomId = Number(req.params.roomId);
        return this._roomService.removeLessonId(roomId);
      }),
    );

    router.get(
      '/:roomId',
      this._getValidationMiddleware({ params: getRoomParamsSchema }),
      this._run((req) => {
        const roomId = Number(req.params.roomId);
        return this._roomService.get(roomId);
      }),
    );

    router.get(
      '/',
      this._run(() => this._roomService.getAllAvailable()),
    );

    router.post(
      '/',
      this._getValidationMiddleware({ body: createRoomBodySchema }),
      this._run((req) => this._roomService.create(req.body)),
    );

    return router;
  }
}

export { Room };
