// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Topic from '../../../app/service/topic';
import User from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    topic: Topic;
    user: User;
  }
}
