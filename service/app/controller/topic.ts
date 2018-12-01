import { Controller } from 'egg'

class TopicController extends Controller {
    
    /**
     * 新增帖子
     */
    public async addTopic () {
        const {ctx} = this;
        const {topicImg, topicTitle} = ctx.request.body

        let userId = ctx.user.userId

        let newTopic = {
            topicImg: JSON.stringify(topicImg),
            topicTitle: topicTitle,
            userId,
        }

        await ctx.service.topic.insertTopic(newTopic)
        
        ctx.returnBody(200, "发帖成功")
    }


    /**
     * 新增评论
     */
    public async addDiscuss () {
        const {ctx} = this;
        const {topicId, replyContent} = ctx.request.body

        let userId = ctx.user.userId
        // 获取并填充数据
        let user = await this.service.user.getUserByUserId(userId)

        // 新帖子
        let newDiscuss = {
            topicId: topicId,
            replyContent: replyContent,
            replyName: user.username,
            userId,
        }

        let discuss: any =  await ctx.service.topic.insertDiscuss(newDiscuss)
        
        discuss && ctx.returnBody(200, "评论成功")
        !discuss && ctx.returnBody(400, "网络异常请稍后重试")
    }


    /**
     * 获取帖子详情
     */
    public async topicDetail () {
        const {ctx} = this;
        const {topicId} = ctx.request.query

        let topicDetail = await ctx.service.topic.topicDetailHanderl(topicId)
        
        ctx.returnBody(200, "成功", topicDetail)
    }

    /**
     * 获取帖子列表
     */
    public async friendsTopicList () {
        const {ctx} = this;

        let userId = ctx.user.userId

        // 查询帖子详情
        let follower =  await ctx.service.follow.findFollow({
            followedId: userId,
            status: 1
        })
        
        // 处理需要查询用户帖子的userId
        let followList = follower.map((item) => {
            return item.userId
        })
        followList.push(userId)

        // 获取每个帖子详情、评论，发帖人信息

        const Op = this.app.Sequelize.Op
        let topics = await ctx.service.topic.queryTopicList({
            userId: {
                [Op.in]: followList
            }
        })
        let topicList: any = [];

        // 将所有帖子处理完毕
        for (let topic of topics) {
            let item = await ctx.service.topic.topicDetailHanderl(topic.topicId)
            topicList.push(item)
        }

        topicList && ctx.returnBody(200, "成功", topicList)
    }

    /**
     * 给帖子点赞
     */
    public async putLikeTopic () {
        const {ctx} = this;
        const {topicId, status} = ctx.request.body

        let userId = ctx.user.userId

        // 新帖子
        let topicStatus = {
            topicId: topicId,
            userId,
            status
        }
        // 查询条件
        let query = {
            topicId: topicId,
            userId,
        }

        // 未曾创建进行创建操作，否则进行更新
        await ctx.service.topic.putTopicLike(query, topicStatus)
        
        ctx.returnBody(200, "更新成功", {
            status: +status
        })
    }

    /**
     * 搜索帖子
     */
    public async searchTopic () {
        const {search} = this.ctx.request.query

        const Op = this.app.Sequelize.Op
        let topics = await this.ctx.service.topic.queryTopicList({
            topicTitle: {
                [Op.regexp]: search
            }
        })
        let topicList: any = [];

        // 将所有帖子处理完毕
        for (let topic of topics) {
            let item = await this.ctx.service.topic.topicDetailHanderl(topic.topicId)
            topicList.push(item)
        }

        this.ctx.returnBody(200, "成功", topicList)
    }


    // 获取用户发布帖子数量
    public async queryTopic () {
        let {ctx} = this
        // 查询点赞数量
        let topicCounts = await ctx.service.topic.queryTopicCounts({
            userId: ctx.user.userId
        })

        return topicCounts
    }
}

module.exports = TopicController
