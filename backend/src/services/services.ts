import { ENV } from 'common/constants/constants';

import {
  user as userRepository,
  refreshToken as refreshTokenRepository,
  // settings as settingsRepository,
  // statistics as statisticsRepository,
} from 'data/repositories/repositories';

import { Auth } from './auth/auth.service';
import { Token } from './token/token.service';
import { User } from './user/user.service';
import { S3 } from './s3/s3.service';
import { Settings } from './settings/settings.service';
// import { Statistics } from './statistics/statistics.service';
import { Hash } from './hash/hash.service';
import { Oauth2 } from './oauth2/oauth2.service';
import { Mailer } from './mailer/mailer.service';
import { Socket } from './socket/socket.service';

const s3 = new S3({
  accessKeyId: ENV.S3.ACCESS_KEY_ID,
  secretAccessKey: ENV.S3.SECRET_ACCESS_KEY,
  bucketName: ENV.S3.BUCKET_NAME,
});

const hash = new Hash();

const settings = new Settings();

const socket = new Socket();

// const statistics = new Statistics({ statisticsRepository });

const token = new Token({
  refreshTokenRepository,
  secretKey: ENV.APP.SECRET_KEY,
});

const user = new User({
  userRepository,
  tokenService: token,
  s3Service: s3,
});

const oauth2 = new Oauth2({
  clientId: ENV.GOOGLE.CLIENT_ID,
  clientSecret: ENV.GOOGLE.CLIENT_SECRET,
  redirectUrl: ENV.GOOGLE.REDIRECT_URL,
  refreshToken: ENV.GOOGLE.REFRESH_TOKEN,
});

const mailer = new Mailer({
  oauth2Service: oauth2,
  user: ENV.MAILER.USER,
  clientId: ENV.GOOGLE.CLIENT_ID,
  clientSecret: ENV.GOOGLE.CLIENT_SECRET,
  refreshToken: ENV.GOOGLE.REFRESH_TOKEN,
});

const auth = new Auth({
  userService: user,
  hashService: hash,
  tokenService: token,
  mailerService: mailer,
  oauth2Service: oauth2,
  appUrl: ENV.APP.URL,
});

export { auth, token, user, s3, hash, oauth2, mailer, settings, socket };
