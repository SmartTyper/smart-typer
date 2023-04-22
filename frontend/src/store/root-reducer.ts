import { request } from './request/request';
import { auth } from './auth/auth';

const rootReducer = {
  auth,
  request,
};

export { rootReducer };
