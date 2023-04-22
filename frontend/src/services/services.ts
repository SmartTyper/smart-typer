import { AuthApi } from './api/api';
import { Http } from './http/http.service';
import { Storage } from './storage/storage.service';
import { Notification } from './notification/notification.service';

const localStorage = new Storage({ storage: window.localStorage });

const http = new Http({ localStorageService: localStorage });

const authApi = new AuthApi({ httpService: http });

const notification = new Notification();

export { localStorage, http, authApi, notification };
