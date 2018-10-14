import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1538800045534_9436';

  // add your egg config in here
  config.middleware = [];
  
  // add RESTful API base path
  config.basePath = '/api/v2'

  // 关闭安全威胁csrf的防范
  config.security = {
    csrf: {
      ignore: ctx => {
        let ipReg = /^(172\.17|127\.0)/;
        return ipReg.test(ctx.ip)
      }
    }
  }

  // cookie name config
  config.auth_cookie_name = 'node_club';

  // config passport 
  config.passportLocal = {
    usernameField: 'username',
    passwordField: 'password',
  };

  // router puls add namespace feature
  config.routerPlus = {
    enable: true,
    package: 'egg-router-plus',
  };

  // 使用koa的中间件
  config.middleware = ['errorHandler']

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // 添加 view 配置
  const view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    view
  };
};
