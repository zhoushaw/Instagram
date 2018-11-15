import { Service } from 'egg';
import {followUserParams} from './type/follow-interface'


/**
 * Service
 */

export default class followService extends Service {
    /*
     * 关注用户
     * @interface {followUserParams}
     */
    public async followUser (followUser: followUserParams) {
        let {ctx} = this

        const obj = await ctx.model.Follow.findOne({ 
            where: {
                userId: followUser.userId
            } 
        })
        
        if(obj) { // update
            return await obj.update(followUser);
        } else { // insert
            return await ctx.model.Follow.create(followUser);
        }
    }

    /*
     * 查询关注用户的列表
     * @interface {followUserParams}
     */
    public async findFollow (query) {
        let {ctx} = this

        return await ctx.model.Follow.findAll({ 
            where: query
        })
    }

    /**
     * 查询用户关注的数量
     */

    public async findFollowCounts (query) {
        let {ctx} = this

        return await ctx.model.Follow.findAndCountAll({ 
            where: query
        })
    }
}
