import EggMysql from 'egg-mysql';

declare module 'egg' {
  interface Application {
    mysql: EggMysql,
    router: {
      namespace: function
    }
  }
}