import { Controller } from 'egg'

class UserController extends Controller {
 
    // 获取用户信息
    public async userInfo() {
        const {ctx} = this

        let userId = ctx.query.userId || ctx.user.userId

        // 获取并填充数据
        let user = await this.service.user.getUserByUserId(userId)
        let userInfo = {
            username: user.username,
            email: user.email,
            avatarUrl: user.avatarUrl,
            abstract: user.abstract,
            account: user.email.replace(/@.*/, ''),
            mobile: user.mobile,
            sex: user.sex,
            userId: user.userId
        }
        ctx.returnBody(200, "获取成功", userInfo)
    }

    // 更新用户信息
    public async updateUserInfo () {
        const {ctx} = this
        let userId = ctx.user.userId

        let contentBody = ctx.request.body
        
        // 更新已使用的他人邮箱地址
        if (contentBody.email) {
            let result = await this.service.user.getUserByMail(contentBody.email)
            if (result && result.userId !== userId) {
                ctx.returnBody(400, "该邮箱已被其他账户使用")
                return
            }
        }

        // 密码校验不通过
        let result = await this.service.user.getUserByUserId(userId)
        if (contentBody.password && result && result.password !== contentBody.password) {
            ctx.returnBody(400, "旧密码不正确")
            return
        } else if(contentBody.password) {
            contentBody.password = contentBody.newPassword
        }

        
        // 获取并填充数据
        await this.service.user.updateUserInfo({userId}, contentBody)

        // 已更改密码，让用户重新登录
        if (contentBody.password) {
            ctx.logout();
            ctx.cookies.set(this.config.auth_cookie_name, "");
            ctx.returnBody(401, "密码更新成功，请重新登录")
        } else {
            ctx.returnBody(200, "更新成功")
        }
    }

    // 获取用户关注、粉丝、帖子数量
    public async userPersonalInfo () {
        const {ctx} = this

        let userId = ctx.query.userId || ctx.user.userId

        // 用户帖子
        let topics = await ctx.service.topic.queryTopicCounts({
            userId
        })

        let topicList: any = [];
        // 将所有帖子处理完毕
        for (let topic of topics.rows) {
            let item = await ctx.service.topic.topicDetailHanderl(topic.topicId)
            topicList.push(item)
        }


        // 用户粉丝
        let fansCounts = await ctx.service.follow.findFollowCounts({
            userId,
            status: 1
        })

        // 用户关注数
        let followCounts = await ctx.service.follow.findFollowCounts({
            followedId: userId,
            status: 1
        })

        // 非本人查询是否关注了登录人

        let isSelf = !ctx.query.userId || ctx.query.userId === ctx.user.userId
        // 查询已关注用户
        let followList = []
        if (!isSelf) {
            followList  = await this.ctx.model.Follow.findAll({
                attributes: ['userId'],
                where: {
                    followedId: ctx.user.userId,
                    userId: ctx.query.userId,
                    status: 1
                }
            })
        }


        ctx.returnBody(200, "获取成功", {
            topic: {
                counts: topics.count,
                topicList
            },
            followCounts: followCounts.count,
            fansCounts: fansCounts.count,
            isSelf,
            hasFollow: followList.length > 0
        })
    }
}

module.exports = UserController
