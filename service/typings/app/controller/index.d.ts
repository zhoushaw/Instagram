// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Home from '../../../app/controller/home';
import Test from '../../../app/controller/test';

declare module 'egg' {
  interface IController {
    home: Home;
    test: Test;
  }
}
