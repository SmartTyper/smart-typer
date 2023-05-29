import { Router } from 'express';
import { room as roomService } from 'services/services';
import { Abstract } from '../abstract/abstract.route';
import { IRequestWithUser } from 'common/interfaces/interfaces';
import { getValidationMiddleware } from 'api/middlewares/middlewares';
import { createRoomSchema } from 'validation-schemas/validation-schemas';

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
      this._run((req) => {
        const roomId = Number(req.params.roomId);
        return this._roomService.getShareUrl(roomId);
      }),
    );

    router.post(
      '/share-url',
      this._run((req: IRequestWithUser) => {
        const userId = req.userId;
        return this._roomService.sendShareUrlToEmails(userId, req.body);
      }),
    );

    // remove participantId from body
    router.post(
      '/:roomId/participants',
      this._run((req) => {
        const roomId = Number(req.params.roomId);
        return this._roomService.addParticipant(roomId, req.body);
      }),
    );

    // /:roomId/participants
    router.delete(
      '/:roomId/participants/:participantId',
      this._run((req) => {
        const roomId = Number(req.params.roomId);
        const participantId = Number(req.params.participantId);
        return this._roomService.removeParticipant(roomId, participantId);
      }),
    );

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
      this._getValidationMiddleware({ body: createRoomSchema }),
      this._run((req) => this._roomService.create(req.body)),
    );

    return router;
  }
}

export { Room };
