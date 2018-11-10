import instance from './axiosInstace.js';

// 注册
exports.register = (data) => {
    return instance.post('/user/register', data);
 };

// 登录
exports.login = (data) => {
    return instance.post('/user/login', data);
 };
  
// 获取好友帖子列表
exports.frientTopicList = (params) => {
    return instance.get('/topic/friend/list', params);
}

// 添加评论
exports.addDiscuss = (data) => {
    return instance.post('/topic/discuss/add', data);
}

// 获取用户信息
exports.getUserInfo = (data) => {
    return instance.get('/user/info', data);
}