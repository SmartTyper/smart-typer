import { FastifyPluginAsync } from 'fastify';
import { auth } from '~/services/services';

type Options = {
  services: {
    auth: typeof auth;
  };
};

const initAuthApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  fastify.route({
    method: 'GET',
    url: '/',
    async handler(_req, rep) {
      //eslint-disable-next-line
      console.log(opts);
      return rep.status(201).send({ yes: 'yes' });
    },
  });
};

export { initAuthApi };
