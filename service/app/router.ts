import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const { user } = controller
    
  router.post(app.config.basePath + '/user/register', user.register); // 注册
  // router.post('/user/login', user.login); // 登录
  // router.put('/user/findPwd', user.findPwd); // 找回密码
}
