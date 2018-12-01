import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  // 本地mysql配置
//   config.mysql = {
//     // 单数据库信息配置
//     client: {
//       // host
//       host: 'localhost',
//       // 端口号
//       port: '3306',
//       // 用户名
//       user: 'root',
//       // 密码
//       password: 'touwohaozhesi',
//       // 数据库名
//       database: 'learn',
//     },
//     // 是否加载到 app 上，默认开启
//     app: true,
//     // 是否加载到 agent 上，默认关闭
//     agent: false,
//   };
  
  // Sequelize config
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'learn',
    username: 'root',
    password: 'touwohaozhesi',
    operatorsAliases: false
  };

  return config;
};
