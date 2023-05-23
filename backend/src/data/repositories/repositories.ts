import {
  User as UserModel,
  RefreshToken as RefreshTokenModel,
  Settings as SettingsModel,
  Statistics as StatisticsModel,
  Skill as SkillModel,
  Room as RoomModel,
  Lesson as LessonModel,
} from 'data/models/models';

import { User } from './user/user.repository';
import { RefreshToken } from './refresh-token/refresh-token.repository';
import { Settings } from './settings/settings.repository';
import { Statistics } from './statistics/statistics.repository';
import { Skill } from './skill/skill.repository';
import { Room } from './room/room.repository';
import { Lesson } from './lesson/lesson.repository';

const refreshToken = new RefreshToken({
  RefreshTokenModel,
});

const settings = new Settings({ SettingsModel });

const statistics = new Statistics({ StatisticsModel });

const skill = new Skill({ SkillModel });

const room = new Room({ RoomModel });

const user = new User({
  UserModel,
  skillRepository: skill,
  roomRepository: room,
});

const lesson = new Lesson({ LessonModel });

export { user, refreshToken, skill, room, settings, statistics, lesson };
