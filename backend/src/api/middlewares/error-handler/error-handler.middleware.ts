import { NextFunction, Request, ErrorRequestHandler, Response } from 'express';
import { HttpCode, HttpErrorMessage } from 'common/enums/enums';
import { HttpError } from 'exceptions/exceptions';
import { Logger } from 'common/types/types';

type Options = {
  logger: Logger;
};

const getErrorHandlerMiddleware = (opts: Options): ErrorRequestHandler => {
  const { logger } = opts;
  return (
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

    logger.error({ status, message });
    logger.error(err);

    res.status(status).send({ error: message });
  };
};

export { getErrorHandlerMiddleware };
