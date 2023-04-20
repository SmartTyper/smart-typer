import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';
import { HttpCode } from 'common/enums/enums';
import { ValidationError } from 'exceptions/exceptions';

export const validationMiddleware = <T extends AnySchema>(
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
        const { errors } = err;

        res.status(HttpCode.BAD_REQUEST).send({
          messages: errors,
        });
      }
    }
  };
};
