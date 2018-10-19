import { Service } from 'egg';
/**
 * Service
 */

// 新增帖子参数
interface insertTopicParams {
    topic_img: string, // 图片地址
    topic_title: string, // 帖子标题
    username: string, // 用户名
    user_id: string // 用户id
}

// 新增评论参数
interface insertDiscussParams {
    topic_id: string, // 帖子id
    reply_content: string, // 帖子内容
    reply_name: string, // 用户名
    user_id: string // 用户id
}

export default class TopicService extends Service {
    /*
     * 新增帖子
     * @interface insertTopicParams
     */
    public async insertTopic (topicParams: insertTopicParams) {
        let {ctx} = this

        return await ctx.model.Topic.create(topicParams);
    }
    /*
     * 新增帖子
     * @interface insertTopicParams
     */
    public async insertDiscuss (discussParams: insertDiscussParams) {
        let {ctx} = this

        return await ctx.model.Discuss.create(discussParams);
    }
}
