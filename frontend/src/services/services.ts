import { AuthApi, UserApi, SettingsApi, RacingApi } from './api/api';
import { Http } from './http/http.service';
import { Storage } from './storage/storage.service';
import { Notification } from './notification/notification.service';

const localStorage = new Storage({ storage: window.localStorage });

const http = new Http({ localStorageService: localStorage });

const notification = new Notification();

const authApi = new AuthApi({ httpService: http });

const userApi = new UserApi({ httpService: http });

const settingsApi = new SettingsApi({ httpService: http });

const racingApi = new RacingApi({ httpService: http });

export {
  localStorage,
  notification,
  authApi,
  userApi,
  settingsApi,
  racingApi,
};
