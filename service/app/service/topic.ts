import { Service } from 'egg';
import { insertTopicParams, insertDiscussParams, queryTopicParams, queryTopicCountsParams} from './type/topic-interface'



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
        let {ctx} = this
        return await ctx.model.Topic.findAll({
            where: query,
            order:  [['created_at', 'DESC']]
        })
    }

    /**
     * 帖子详情handler
     * params {topicId} // string
     */
    public async topicDetailHanderl(topicId) {
        const { ctx } = this;


        // 查询帖子详情
        let topic = await ctx.service.topic.queryTopicDetail({
            topicId: +topicId // 帖子id
        })

        let userId = topic.userId
        // 获取并填充数据
        let user = await this.service.user.getUserByUserId(userId)

        // 查询帖子评论
        let discuss = await ctx.service.topic.queryDiscuss({
            topicId: +topicId // 帖子id
            // userId: ctx.user.userId
        })

        // 查询用户是否已点赞
        let topicLike = await ctx.service.topic.queryTopicLike({
            topicId: +topicId, // 帖子id
            userId: ctx.user.userId,
            status: 1
        })

        // 查询点赞数量
        let topicLikeCounts = await ctx.service.topic.queryTopicLikeCounts({
            topicId: +topicId, // 帖子id
            // userId: ctx.user.userId,
            status: 1
        })


        // 处理帖子数据
        let disscussList = discuss.map((item) => {
            return {
                replyName: item.replyName,
                replyContent: item.replyContent,
                userId: item.userId
            }
        })

        // 返回帖子详情
        const topicDetail = {
            userInfo: {
                username: user.username,
                avatarUrl: user.avatarUrl,
                userId: user.userId
            },
            topic: {
                topicImgList: JSON.parse(topic.topicImg),
                created_at: topic.created_at,
                topicId,
                topicLike: !!topicLike,
                topicLikeCounts: topicLikeCounts.count
            },
            discuss: disscussList
        }
        return topicDetail || {}
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
     * 查询帖子数量
     * @interface insertTopicParams
     */
    public async queryTopicCounts(query: queryTopicCountsParams) {
        let { ctx } = this

        return await ctx.model.Topic.findAndCountAll({
            where: query,
            order:  [['created_at', 'DESC']]
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
