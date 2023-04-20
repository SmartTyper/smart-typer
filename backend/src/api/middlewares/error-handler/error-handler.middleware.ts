import { NextFunction, Request, Response } from 'express';
import { HttpCode, HttpErrorMessage } from 'common/enums/enums';
// import { logger } from 'common/utils';
import { HttpError } from 'exceptions/exceptions';

export const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  __next: NextFunction,
): void => {
  const isHttpError = err.name === 'HttpError';

  const status = isHttpError
    ? (err as HttpError).status
    : HttpCode.INTERNAL_SERVER_ERROR;
  const message = isHttpError
    ? err.message
    : HttpErrorMessage.INTERNAL_SERVER_ERROR;

  // logger.error({ status, message });
  // logger.error(err);

  res.status(status).send({ error: message });
};
