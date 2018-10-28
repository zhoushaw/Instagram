// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Handle from '../../../app/controller/handle';
import Topic from '../../../app/controller/topic';
import User from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    handle: Handle;
    topic: Topic;
    user: User;
  }
}
