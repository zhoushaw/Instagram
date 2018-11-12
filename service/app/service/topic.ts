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

    /**
     * 帖子详情handler
     * params {topicId} // string
     */
    public async topicDetailHanderl(topicId) {
        const { ctx } = this;


        // 查询帖子详情
        let topic = await ctx.service.topic.queryTopicDetail({
            topic_id: +topicId // 帖子id
        })

        let user_id = topic.user_id
        // 获取并填充数据
        let user = await this.service.user.getUserByUserId(user_id)

        // 查询帖子评论
        let discuss = await ctx.service.topic.queryDiscuss({
            topic_id: +topicId, // 帖子id
            user_id: ctx.user.user_id
        })

        // 查询用户是否已点赞
        let topicLike = await ctx.service.topic.queryTopicLike({
            topic_id: +topicId, // 帖子id
            user_id: ctx.user.user_id,
            status: 1
        })

        // 查询点赞数量
        let topicLikeCounts = await ctx.service.topic.queryTopicLikeCounts({
            topic_id: +topicId, // 帖子id
            user_id: ctx.user.user_id,
            status: 1
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
                createdAt: topic.created_at,
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
