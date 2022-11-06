import { FastifyPluginAsync, FastifyRequest } from 'fastify';

const initAuthApi: FastifyPluginAsync<{ type: string }> = async (
  fastify,
  opts,
) => {
  fastify.route({
    method: 'GET',
    url: '/',
    async handler(_req: FastifyRequest<{ Body: { type: string } }>, rep) {
      console.log(opts);
      return rep.status(201).send('yes');
    },
  });
};

export { initAuthApi };
