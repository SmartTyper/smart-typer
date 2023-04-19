import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import Knex from 'knex';
import * as path from 'node:path';
import { Model } from 'objection';

import { initApi } from 'api/api';
import { Environment } from 'common/enums/enums';
import { ENV } from 'common/constants/constants';
import knexConfig from '../knexfile';

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

Model.knex(Knex(knexConfig[ENV.APP.NODE_ENV as Environment]));

app.register(initApi, {
  prefix: ENV.APP.API_PREFIX,
});

const staticPath = path.join(__dirname, '../public');

app.register(fastifyStatic, {
  root: staticPath,
  prefix: '/',
});

app.setNotFoundHandler((_req, res) => {
  res.sendFile('index.html', staticPath);
});

app.listen({ port: ENV.APP.SERVER_PORT }, (err, address) => {
  if (err) {
    app.log.error(err);
  }

  app.log.info(`Listening on: ${address}; Environment: ${ENV.APP.NODE_ENV}`);
});
