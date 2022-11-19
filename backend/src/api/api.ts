import { FastifyPluginAsync } from 'fastify';

import { ValidationSchema } from '~/common/types/types';
import { auth } from '~/services/services';

import { initAuthApi } from './auth/auth.api';

const initApi: FastifyPluginAsync = async (fastify) => {
  fastify.setValidatorCompiler<ValidationSchema>(({ schema }) => {
    return <T>(data: T): ReturnType<ValidationSchema['validate']> => {
      return schema.validate(data);
    };
  });

  fastify.register(initAuthApi, {
    services: {
      auth,
    },
    prefix: '/auth',
  });
};

export { initApi };
