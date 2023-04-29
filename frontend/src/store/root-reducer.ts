import { request, auth, profile, racing, settings } from './modules/reducers';

const rootReducer = {
  auth,
  request,
  profile,
  racing,
  settings,
};

export { rootReducer };
