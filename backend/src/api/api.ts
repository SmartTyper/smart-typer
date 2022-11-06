import { FastifyPluginAsync } from 'fastify';

import { initAuthApi } from './auth/auth.api';

const initApi: FastifyPluginAsync = async (fastify) => {
  fastify.register(initAuthApi, {
    prefix: '/auth',
  });
};

export { initApi };
