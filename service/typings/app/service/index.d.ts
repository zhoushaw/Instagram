// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Test from '../../../app/service/Test';
import User from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    test: Test;
    user: User;
  }
}
