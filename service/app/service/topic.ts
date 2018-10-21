import { Service } from 'egg';
import {insertTopicParams, insertDiscussParams, queryTopicParams} from './type/topic-interface'



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
     * 查找是否点过赞
     * @interface insertTopicParams
     */
    public async queryTopicLike (query: queryTopicParams) {
        let {ctx} = this
        return await ctx.model.TopicLike.findOne({
            where: query
        });
    }

    /*
     * 创建一条点赞记录
     */
    public async createdTopicLike (topicStatus) {
        let {ctx} = this

        return await ctx.model.Discuss.create(topicStatus);
    }

    /*
     * 更新点赞状态
     * @interface insertTopicParams
     */
    public async putTopicLike (query: queryTopicParams, topicStatus) {
        let {ctx} = this

        return await ctx.model.TopicLike.update(topicStatus, {
            where: query
        });
    }
    
    /*
     * 查询评论详情
     * @interface insertTopicParams
     */
    public async queryDiscuss (query: queryTopicParams) {
        let {ctx} = this

        return await ctx.model.TopicLike.findAll({
            where: query
        });
    }

}
