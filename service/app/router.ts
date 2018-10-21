import { Application, Router } from 'egg';

export default (app: Application) => {
  const { controller } = app;
  const { user, topic } = controller
  
  const apiV2Router: Router = app.router.namespace('/api/v2');

  apiV2Router.post('/user/register', user.register); // 注册
  apiV2Router.post('/user/login', user.loginIn); // 登录
  apiV2Router.get('/user/signout', user.signOut); // 退出登录
  apiV2Router.get('/user/test', user.test); // 退出登录


  apiV2Router.post('/topic/add', topic.addTopic); // 新增帖子
  apiV2Router.get('/topic/detail', topic.topicDetail); // 获取帖子详情
  apiV2Router.post('/topic/discuss/add', topic.addDiscuss); // 新增评论
  apiV2Router.put('/topic/like', topic.putLikeTopic); // 新增评论

  // router.put('/user/findPwd', user.findPwd); // 找回密码
}
