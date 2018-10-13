import { Application, Router } from 'egg';

export default (app: Application) => {
  const { controller } = app;
  const { user } = controller
  
  const apiV2Router: Router = app.router.namespace('/api/v2');
  const localStrategy = app.passport.authenticate('local');
  

  apiV2Router.post('/user/register', user.register); // 注册

  apiV2Router.post('/user/login', localStrategy);

  // router.post('/user/login', user.login); // 登录
  // router.put('/user/findPwd', user.findPwd); // 找回密码
}
