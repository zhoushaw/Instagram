import instance from './axiosInstace.js';

// 注册
exports.register = (data) => {
    return instance.post('/login/register', data);
 };

// 登录
exports.login = (data) => {
    return instance.post('/login', data);
};
// 退出登录
exports.signout = (data) => {
    return instance.get('/login/signout', data);
};
  




// 获取用户信息
exports.getUserInfo = (data) => {
    return instance.get('/user/info', data);
}

// 获取用户关注、发帖信息
exports.getPersonalInfo = (data) => {
    return instance.get('/user/personal', data);
}

// 更新用户信息
exports.updatePersonalInfo = (data) => {
    return instance.post('/user/update', data);
}




// 点赞
exports.topicLike = (data) => {
    return instance.put('/topic/like', data);
}

// 获取好友帖子列表
exports.frientTopicList = (data) => {
    return instance.get('/topic/friend/list', data);
}

// 添加评论
exports.addDiscuss = (data) => {
    return instance.post('/topic/discuss/add', data);
}




// 未关注列表
exports.friendList = (data) => {
    return instance.get('/friend/list', data);
}

// 关注
exports.followUser = (data) => {
    return instance.post('/friend/follow', data);
}

