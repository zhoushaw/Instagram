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
                user_id: followUser.user_id
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
    public async findFollow (user_id) {
        let {ctx} = this

        return await ctx.model.Follow.findAll({ 
            where: {
                followed_id: user_id
            } 
        })
    }
}
