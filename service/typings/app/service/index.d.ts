// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Topic from '../../../app/service/topic';
import User from '../../../app/service/user';
import TypeTopicInterface from '../../../app/service/type/topic-interface';

declare module 'egg' {
  interface IService {
    topic: Topic;
    user: User;
    type: {
      topicInterface: TypeTopicInterface;
    };
  }
}
