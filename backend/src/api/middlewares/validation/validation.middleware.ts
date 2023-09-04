import { Request, Response, NextFunction } from 'express';
import { yup } from 'dependencies/dependencies';
import { HttpCode } from 'common/enums/enums';
import { ValidationError } from 'exceptions/exceptions';

export const getValidationMiddleware = <
  T extends yup.AnySchema,
  K extends yup.AnySchema,
  P extends yup.AnySchema,
>(
  schema: {
    body?: T;
    query?: K;
    params?: P;
  },
  context?: Record<string, unknown>,
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { body, query, params } = req;
    const {
      body: bodySchema,
      query: querySchema,
      params: paramsSchema,
    } = schema;
    try {
      if (bodySchema) {
        await bodySchema.validate(body, { context });
      }
      if (querySchema) {
        await querySchema.validate(query, { context });
      }
      if (paramsSchema) {
        await paramsSchema.validate(params, { context });
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
