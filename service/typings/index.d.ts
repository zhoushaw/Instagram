import 'egg';
import EggMysql from 'egg-mysql';

declare module 'egg' {
  interface Application {
    mysql: EggMysql
  }
}