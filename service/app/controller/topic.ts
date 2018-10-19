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

        let user_id = ctx.user.user_id
        // 获取并填充数据
        let user = await this.service.user.getUserByUserId(user_id)

        // 查询帖子详情
        let topic =  await ctx.service.topic.queryTopicDetail({
            topic_id: +topicId // 帖子id
        })
        
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
                topicImgList: JSON.parse(topic.topic_img)
            },
            discuss: disscussList
        }
        
        topic && ctx.returnBody(200, "成功", topicDetail)
        !topic && ctx.returnBody(400, "网络异常请稍后重试")
    }

}

module.exports = TopicController
