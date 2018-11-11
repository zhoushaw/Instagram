import { Service } from 'egg';
import { insertTopicParams, insertDiscussParams, queryTopicParams} from './type/topic-interface'



/**
 * Service
 */

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
     * 新增评论
     * @interface insertTopicParams
     */
    public async insertDiscuss (discussParams: insertDiscussParams) {
        let {ctx} = this

        return await ctx.model.Discuss.create(discussParams);
    }

    /*
     * 查询帖子详情
     * @interface insertTopicParams
     */
    public async queryTopicDetail (query: queryTopicParams) {
        let {ctx} = this
        return await ctx.model.Topic.findOne({
            where: query
        })
    }

    /*
     * 查询帖子列表
     * @interface insertTopicParams
     */
    public async queryTopicList (query) {
        let {ctx, app} = this
        const sequelize = app.Sequelize
        const Op = sequelize.Op;
        return await ctx.model.Topic.findAll({
            where: {
                user_id: {
                    [Op.in]: query
                }
            },
            order: sequelize.col('created_at')
        })
    }


    /*
     * 查找是否点过赞
     * @interface insertTopicParams
     */
    public async queryTopicLike(query: queryTopicParams) {
        let {ctx} = this
        return await ctx.model.TopicLike.findOne({
            where: query
        });
    }


    /*
     * 创建或更新点赞状态
     * @interface insertTopicParams
     */
    public async putTopicLike(query: queryTopicParams, topicStatus) {
        let { ctx } = this
        let result = await this.queryTopicLike(query)

        if (!result) {
            return await ctx.model.TopicLike.create(topicStatus)
        } else {
            return await ctx.model.TopicLike.update(topicStatus, {
                where: query
            })
        }
    }

    /*
     * 查询帖子点赞数量
     * @interface insertTopicParams
     */
    public async queryTopicLikeCounts(query: queryTopicParams) {
        let { ctx } = this

        return await ctx.model.TopicLike.findAndCountAll({
            where: query
        });
    }
    
    /*
     * 查询评论详情
     * @interface insertTopicParams
     */
    public async queryDiscuss (query: queryTopicParams) {
        let {ctx} = this

        return await ctx.model.Discuss.findAll({
            where: query
        });
    }


    /*
     * 查询评论详情
     * @interface insertTopicParams
     */
    public async countsTopic (query: queryTopicParams) {
        let {ctx} = this

        return await ctx.model.Discuss.findAll({
            where: query
        });
    }


}
