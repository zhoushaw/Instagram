import { Controller } from 'egg'

class TopicController extends Controller {
    
    /**
     * 新增帖子
     */
    public async addTopic () {
        const {ctx} = this;
        const {topicImg, topicTitle} = ctx.request.body

        let user_id = ctx.user.user_id

        // 新帖子
        let newTopic = {
            topic_img: JSON.stringify(topicImg),
            topic_title: topicTitle,
            user_id,
        }

        let topic: any =  await ctx.service.topic.insertTopic(newTopic)
        
        topic && ctx.returnBody(200, "发帖成功")
        !topic && ctx.returnBody(400, "网络异常请稍后重试")
    }


    /**
     * 新增评论
     */
    public async addDiscuss () {
        const {ctx} = this;
        const {topicId, replyContent} = ctx.request.body

        let user_id = ctx.user.user_id
        // 获取并填充数据
        let user = await this.service.user.getUserByUserId(user_id)

        // 新帖子
        let newDiscuss = {
            topic_id: topicId,
            reply_content: replyContent,
            reply_name: user.username,
            user_id,
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

        let topicDetail = await this.topicDetailHanderl(topicId)
        
        ctx.returnBody(200, "成功", topicDetail)
    }

    /**
     * 帖子详情handler
     * params {topicId} // string
     */
    private async topicDetailHanderl (topicId) {
        const {ctx} = this;


        // 查询帖子详情
        let topic =  await ctx.service.topic.queryTopicDetail({
            topic_id: +topicId // 帖子id
        })
        
        let user_id = topic.user_id
        // 获取并填充数据
        let user = await this.service.user.getUserByUserId(user_id)

        // 查询帖子评论
        let discuss = await ctx.service.topic.queryDiscuss({
            topic_id: +topicId // 帖子id
        })
        // 处理帖子数据
        let disscussList = discuss.map((item) => {
            return {
                replyName: item.reply_name,
                replyContent: item.reply_content,
                userId: item.user_id
            }
        })

        // 返回帖子详情
        const topicDetail = {
            userInfo: {
                username: user.username,
                avatarUrl: user.avatar_url
            },
            topic: {
                topicImgList: JSON.parse(topic.topic_img),
                createdAt: topic.created_at
            },
            discuss: disscussList
        }
        return topicDetail || {}
    }

    /**
     * 获取帖子列表
     */
    public async friendsTopicList () {
        const {ctx} = this;

        let user_id = ctx.user.user_id

        // 查询帖子详情
        let follower =  await ctx.service.follow.findFollow(user_id)
        
        // 处理需要查询用户帖子的user_id
        let followList = follower.map((item) => {
            return item.user_id
        })
        followList.push(user_id)

        // 获取每个帖子详情、评论，发帖人信息
        let topics = await ctx.service.topic.queryTopicList(followList)
        let topicList: any = [];

        // 将所有帖子处理完毕
        for (let topic of topics) {
            let item =  await this.topicDetailHanderl(topic.topic_id)
            topicList.push(item)
        }

        topicList && ctx.returnBody(200, "成功", topicList)
    }

    /**
     * 给帖子点赞
     */
    public async putLikeTopic () {
        const {ctx} = this;
        const {topicId, status} = ctx.request.query

        let user_id = ctx.user.user_id

        // 新帖子
        let topicStatus = {
            topic_id: topicId,
            user_id,
            status
        }
        // 查询条件
        let query = {
            topic_id: topicId
        }

        // 未曾创建进行创建操作，否则进行更新
        let hadTopicLike = await ctx.service.topic.queryTopicLike(query)
        let putLike;
        if (hadTopicLike) {
            putLike =  await ctx.service.topic.putTopicLike(query, topicStatus)
        } else {
            putLike =  await ctx.service.topic.createdTopicLike(query)
        }
        
        ctx.returnBody(200, putLike? "更新成功" : "网络异常请稍后重试")
    }


}

module.exports = TopicController
