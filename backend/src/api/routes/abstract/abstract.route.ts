import { Response, NextFunction, Request } from 'express';
import { HttpCode, UserKey } from 'common/enums/enums';

class Abstract {
  protected _run<T, R extends Request>(method: (req: R) => Promise<T>) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const result = await method(req as R);
        if (
          result &&
          Object.prototype.hasOwnProperty.call(result, UserKey.PASSWORD)
        ) {
          res.send({ ...result, password: null });
        } else if (result) {
          res.send(result);
        } else {
          res.sendStatus(HttpCode.NO_CONTENT);
        }
      } catch (err) {
        next(err);
      }
    };
  }
}

export { Abstract };
