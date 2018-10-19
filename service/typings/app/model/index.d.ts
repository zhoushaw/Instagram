// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Discuss from '../../../app/model/discuss';
import Topic from '../../../app/model/topic';
import User from '../../../app/model/user';

declare module 'sequelize' {
  interface Sequelize {
    Discuss: ReturnType<typeof Discuss>;
    Topic: ReturnType<typeof Topic>;
    User: ReturnType<typeof User>;
  }
}
