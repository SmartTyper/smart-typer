import Fastify from 'fastify';
import Knex from 'knex';
import { Model } from 'objection';

import { initApi } from '~/api/api';
import { AppEnvironment, ENV } from '~/common/enums/enums';
import knexConfig from '../knexfile';

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

Model.knex(Knex(knexConfig[AppEnvironment.DEVELOPMENT]));

app.register(initApi, {
  prefix: ENV.APP.API_PREFIX,
});

app.listen({ port: ENV.APP.SERVER_PORT }, (err, address) => {
  if (err) {
    app.log.error(err);
  }

  app.log.info(
    `Listening on: ${address}; Environment: ${AppEnvironment.DEVELOPMENT}`,
  );
});
