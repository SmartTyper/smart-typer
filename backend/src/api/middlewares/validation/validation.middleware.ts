import { Request, Response, NextFunction } from 'express';
import { yup } from 'dependencies/dependencies';
import { HttpCode } from 'common/enums/enums';
import { ValidationError } from 'exceptions/exceptions';

export const getValidationMiddleware = <T extends yup.AnySchema>(
  schema: {
    body?: T;
    query?: T;
  },
  context?: Record<string, unknown>,
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { body, query } = req;
    const { body: bodySchema, query: querySchema } = schema;
    try {
      if (bodySchema) {
        await bodySchema.validate(body, { context });
      }
      if (querySchema) {
        await querySchema.validate(query, { context });
      }
      next();
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        res.status(HttpCode.BAD_REQUEST).send({
          messages: err.message,
        });
      } else {
        next(err);
      }
    }
  };
};
