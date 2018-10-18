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

export default class TopicService extends Service {
    /*
    * 新增帖子
    * @interface insertTopicParams
    */
    public async insertTopic (topicParams: insertTopicParams) {
      let {ctx} = this

      await ctx.model.Topic.create(topicParams);
    }
}
