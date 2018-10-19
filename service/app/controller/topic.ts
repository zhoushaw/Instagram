import { Controller } from 'egg'

class TopicController extends Controller {
    
    
    public async addTopic () {
        const {ctx} = this;
        const {topicImg, topicTitle} = ctx.request.body

        let user_id = ctx.user.user_id
        // 获取并填充数据
        let user = await this.service.user.getUserByUserId(user_id)

        // 新帖子
        let newTopic = {
            topic_img: JSON.stringify(topicImg),
            topic_title: topicTitle,
            username: user.username,
            user_id,
        }

        let topic: any =  await ctx.service.topic.insertTopic(newTopic)
        
        topic && ctx.returnBody(200, "发帖成功")
        !topic && ctx.returnBody(400, "网络异常请稍后重试")
    }


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
        
        discuss && ctx.returnBody(200, "发帖成功")
        !discuss && ctx.returnBody(400, "网络异常请稍后重试")
    }


}

module.exports = TopicController
