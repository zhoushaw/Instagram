import { Controller } from 'egg'

class FriendController extends Controller {

    // 关注好友
    public async follow() {
        const {ctx} = this
        const {userId, status} = ctx.request.body

        let followedId = ctx.user.userId

        // 新帖子
        let followMsg = {
            userId, // 被关注者id
            followedId, // 关注者id
            status
        }

        await ctx.service.follow.followUser(followMsg)
        
        ctx.returnBody(200, +status?"关注成功":"取消成功")
    }


    // 获取未关注用户列表
    public async notFollowList() {
        const {ctx} = this

        let userId = ctx.user.userId

        let friendList = await ctx.service.user.getUserList(userId)
        
        ctx.returnBody(200, "获取成功", friendList)
    }
}

module.exports = FriendController
