import { Http } from './http/http.service';
import { AuthApi } from './api/api';
import { Storage } from './storage/storage';

const localStorage = new Storage({ storage: window.localStorage });

const http = new Http({ localStorageService: localStorage });

const authApi = new AuthApi({ httpService: http });

export { localStorage, http, authApi };
