// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Friend from '../../../app/controller/friend';
import Handle from '../../../app/controller/handle';
import Login from '../../../app/controller/login';
import Topic from '../../../app/controller/topic';
import User from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    friend: Friend;
    handle: Handle;
    login: Login;
    topic: Topic;
    user: User;
  }
}
