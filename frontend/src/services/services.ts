import { AuthApi, UserApi, SettingsApi } from './api/api';
import { Http } from './http/http.service';
import { Storage } from './storage/storage.service';
import { Notification } from './notification/notification.service';

const localStorage = new Storage({ storage: window.localStorage });

const http = new Http({ localStorageService: localStorage });

const notification = new Notification();

const authApi = new AuthApi({ httpService: http });

const userApi = new UserApi({ httpService: http });

const settingsApi = new SettingsApi({ httpService: http });

export { localStorage, http, notification, authApi, userApi, settingsApi };
