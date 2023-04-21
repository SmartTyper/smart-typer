import cors from 'cors';
import Knex from 'knex';
import path from 'path';
import express, { Express } from 'express';
import { createServer } from 'http';
import { Model } from 'objection';
import pino from 'pino';

import { initApi } from 'api/api';
import { ENV } from 'common/constants/constants';
import { Environment } from 'common/enums/enums';
import knexConfig from '../knexfile';

const app: Express = express();
const httpServer = createServer(app);

const knex = Knex(knexConfig[ENV.APP.NODE_ENV as Environment]);
Model.knex();

const logger = pino({
  prettyPrint: true,
});

app.use(
  cors({
    origin: ENV.APP.URL,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(initApi(logger));

app.use(express.static(path.join(__dirname, '../public')));
app.use('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

httpServer.listen(ENV.APP.SERVER_PORT, async () => {
  logger.info(
    `Server is running at ${ENV.APP.SERVER_PORT}. Environment: ${ENV.APP.NODE_ENV}.`,
  );
});

app.on('close', async () => {
  await knex.destroy();
});

export default app;
