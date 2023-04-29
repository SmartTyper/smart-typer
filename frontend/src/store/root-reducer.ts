import { request } from './request/request';
import { auth } from './auth/auth';
import { profile } from './profile/profile';
import { racing } from './racing/racing';
import { settings } from './settings/settings';

const rootReducer = {
  auth,
  request,
  profile,
  racing,
  settings,
};

export { rootReducer };
