import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

import { AppEnvironment, ENV } from './src/common/enums/enums';

type ConfigPropType = Record<string, unknown>;

const DEFAULT_ENV_CONFIG: Knex.Config<ConfigPropType> = {
  client: ENV.DB.CLIENT,
  connection: ENV.DB.URL,
  pool: {
    min: ENV.DB.POOL_MIN,
    max: ENV.DB.POOL_MAX,
  },
  migrations: {
    directory: './src/data/migrations',
    tableName: 'migrations',
  },
  debug: false,
  ...knexSnakeCaseMappers({ underscoreBetweenUppercaseLetters: true }),
};

const knexConfig: Record<AppEnvironment, Knex.Config<ConfigPropType>> = {
  [AppEnvironment.DEVELOPMENT]: DEFAULT_ENV_CONFIG,
  [AppEnvironment.PRODUCTION]: DEFAULT_ENV_CONFIG,
};

export default knexConfig;
