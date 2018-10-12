// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import User from '../../../app/model/user';

declare module 'sequelize' {
  interface Sequelize {
    User: ReturnType<typeof User>;
  }
}
