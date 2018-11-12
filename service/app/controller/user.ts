import { Controller } from 'egg'

class UserController extends Controller {
    /**
     * H5 注册/登录/找回密码
     * @return {Promise<*>}
     */

    // 注册
    public async register () {
        const {ctx} = this;
        const {password, username, email} = ctx.request.body

        // 错误处理
        if (!this.__errNotice) return

        // 注册成功返回体
        await ctx.service.user.register({ password, username, email});

    }

    // 登录
    public async loginIn () {
        const {ctx} = this;
        const {password, email} = ctx.request.body

        // 登录
        const token = await ctx.service.user.login({password, email})

        // set cookie
        if (token) {
            // id存入Cookie, 用于验证过期.
            const opts = {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 30,
                // maxAge: 1000 * 40,
                // signed: true,
                httpOnly: false,
                domain: '127.0.0.1'
            };
            ctx.cookies.set(this.config.auth_cookie_name, token, opts); // cookie 有效期30天
            ctx.returnBody(200, "登录成功")
        } else {
            ctx.throw(400, '用户名或密码错误')
        }
    }

    // 退出登录
    public async signOut () {
        const { ctx } = this;
        ctx.logout();
        ctx.cookies.set(this.config.auth_cookie_name, ""); // cookie 有效期30天
        ctx.returnBody(200, "退出登录成功")
    }

    // 关注好友
    public async follow() {
        const {ctx} = this
        const {followedId, status} = ctx.request.body

        let user_id = ctx.user.user_id

        // 新帖子
        let followMsg = {
            user_id: followedId, // 被关注者id
            followed_id: user_id, // 关注者id
            status
        }

        let result = await ctx.service.follow.followUser(followMsg)
        
        result && ctx.returnBody(200, +status?"关注成功":"取消成功")
        !result && ctx.returnBody(400, "网络异常请稍后重试")
        
    }

    // 参数异常函数
    private __errNotice () {
        const {ctx} = this;
        const {mobile, password, code, username, email} = ctx.request.body
        // 参数校验
        let message;
        if (!mobile || !email) {
            message = '手机号或者邮箱不能为空'
        } else if (!code) {
            message = '验证码不能为空'
        } else if (!username) {
            message = '用户名为空'
        } else if (!password) {
            message = '密码不能为空'
        }

        // 抛出异常
        if (message) {
            ctx.throw(400, message);
            return false
        }
        return true
    }

    // 获取用户信息
    public async userInfo() {
        const {ctx} = this

        let user_id = ctx.user.user_id

        // 获取并填充数据
        let user = await this.service.user.getUserByUserId(user_id)
        let userInfo = {
            username: user.username,
            email: user.email,
            avatarUrl: user.avatar_url,
            abstract: user.abstract
        }
        ctx.returnBody(200, "获取成功", userInfo)
    }

    // 获取用户关注、粉丝、帖子数量
    public async userPersonalInfo () {
        const {ctx} = this

        let user_id = ctx.user.user_id

        // 用户帖子
        let topics = await ctx.service.topic.queryTopicCounts({
            user_id
        })

        let topicList: any = [];
        // 将所有帖子处理完毕
        for (let topic of topics.rows) {
            let item = await ctx.service.topic.topicDetailHanderl(topic.topic_id)
            topicList.push(item)
        }


        // 用户粉丝
        let fansCounts = await ctx.service.follow.findFollowCounts({
            user_id
        })

        // 用户关注数
        let followCounts = await ctx.service.follow.findFollowCounts({
            followed_id: user_id
        })

        ctx.returnBody(200, "获取成功", {
            topic: {
                counts: topics.count,
                topicList
            },
            followCounts: followCounts.count,
            fansCounts: fansCounts.count
        })
    }
}

module.exports = UserController
