import { config } from 'dotenv';

config();

const {
  NODE_ENV,
  PORT,
  API_PREFIX,
  DB_URL,
  DB_POOL_MIN,
  DB_POOL_MAX,
  DB_CLIENT,
} = process.env;

const ENV = {
  APP: {
    NODE_ENV,
    SERVER_PORT: Number(PORT),
    API_PREFIX,
  },
  DB: {
    URL: DB_URL,
    POOL_MIN: Number(DB_POOL_MIN),
    POOL_MAX: Number(DB_POOL_MAX),
    CLIENT: DB_CLIENT,
  },
};

export { ENV };
