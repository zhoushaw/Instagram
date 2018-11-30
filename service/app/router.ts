import { Application, Router } from 'egg';

export default (app: Application) => {
  const { controller } = app;
  const { user, topic, handle, friend, login } = controller
  
  const apiV2Router: Router = app.router.namespace('/api/v2');



    // login 
    apiV2Router.post('/login/register', login.register); // 注册
    apiV2Router.post('/login', login.loginIn); // 登录
    apiV2Router.get('/login/signout', login.signOut); // 退出登录


    // user
    apiV2Router.get('/user/info', user.userInfo); // 用户信息
    apiV2Router.get('/user/personal', user.userPersonalInfo); // 用户信息
    apiV2Router.post('/user/update', user.updateUserInfo); // 用户信息


    // handle
    apiV2Router.get('/handle/upload/get-token', handle.getQiniuToken); // 退出登录


    // friend
    apiV2Router.post('/friend/follow', friend.follow); // 关注
    apiV2Router.get('/friend/list', friend.notFollowList); // 关注


    // topic
    apiV2Router.get('/topic/search', topic.searchTopic); // 新增帖子
    apiV2Router.post('/topic/add', topic.addTopic); // 新增帖子
    apiV2Router.get('/topic/detail', topic.topicDetail); // 获取帖子详情
    apiV2Router.post('/topic/discuss/add', topic.addDiscuss); // 新增评论
    apiV2Router.put('/topic/like', topic.putLikeTopic); // 点赞
    apiV2Router.get('/topic/friend/list', topic.friendsTopicList); // 新增评论
    // router.put('/user/findPwd', user.findPwd); // 找回密码
}
