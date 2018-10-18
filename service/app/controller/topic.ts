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

        await ctx.service.topic.insertTopic(newTopic)
    }
}

module.exports = TopicController
