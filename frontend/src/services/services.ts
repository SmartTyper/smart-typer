import { AuthApi, RoomApi, JokeApi, SettingsApi, UserApi } from './api/api';
import { Http } from './http/http.service';
import { Navigation } from './navigation/navigation.service';
import { Notification } from './notification/notification.service';
import { Socket } from './socket/socket.service';
import { Storage } from './storage/storage.service';

const localStorage = new Storage({ storage: window.localStorage });

const navigation = new Navigation({ location: window.location });

const http = new Http({
  localStorageService: localStorage,
  navigationService: navigation,
});

const notification = new Notification();

const socket = new Socket();

const authApi = new AuthApi({ httpService: http });

const userApi = new UserApi({ httpService: http });

const settingsApi = new SettingsApi({ httpService: http });

const roomApi = new RoomApi({ httpService: http });

const jokeApi = new JokeApi({ httpService: http });

export {
  localStorage,
  notification,
  authApi,
  userApi,
  settingsApi,
  roomApi,
  jokeApi,
  socket,
  navigation,
};
